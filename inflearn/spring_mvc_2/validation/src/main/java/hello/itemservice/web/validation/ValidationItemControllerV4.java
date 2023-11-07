package hello.itemservice.web.validation;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import hello.itemservice.domain.item.Item;
import hello.itemservice.domain.item.ItemRepository;
import hello.itemservice.web.validation.form.ItemSaveForm;
import hello.itemservice.web.validation.form.ItemUpdateForm;
import lombok.RequiredArgsConstructor;

@Controller
@RequestMapping("/validation/v4/items")
@RequiredArgsConstructor
public class ValidationItemControllerV4 {

    private final ItemRepository itemRepository;

    private void validateItem(ItemSaveForm form, BindingResult bindingResult) {
        int minTotalPrice = 10_000;

        if (form.getPrice() != null && form.getQuantity() != null) {
            int totalPrice = form.getPrice() * form.getQuantity();
            if (totalPrice < minTotalPrice)
                bindingResult.reject("totalPriceMin", new Object[] { minTotalPrice, totalPrice }, null);
        }

    }

    @GetMapping
    public String items(Model model) {
        List<Item> items = itemRepository.findAll();
        model.addAttribute("items", items);
        return "validation/v4/items";
    }

    @GetMapping("/{itemId}")
    public String item(@PathVariable long itemId, Model model) {
        Item item = itemRepository.findById(itemId);
        model.addAttribute("item", item);
        return "validation/v4/item";
    }

    @GetMapping("/add")
    public String addForm(Model model) {
        model.addAttribute("item", new Item());
        return "validation/v4/addForm";
    }

    @PostMapping("/add")
    public String addItem(@Validated @ModelAttribute("item") ItemSaveForm form,
            BindingResult bindingResult,
            RedirectAttributes redirectAttributes,
            Model model) {
        this.validateItem(form, bindingResult);
        if (bindingResult.hasErrors())
            return "validation/v4/addForm";

        Item item = Item.builder()
                .itemName(form.getItemName())
                .price(form.getPrice())
                .quantity(form.getQuantity())
                .build();

        Item savedItem = itemRepository.save(item);

        redirectAttributes.addAttribute("itemId", savedItem.getId());
        redirectAttributes.addAttribute("status", true);
        return "redirect:/validation/v4/items/{itemId}";
    }

    @GetMapping("/{itemId}/edit")
    public String editForm(@PathVariable Long itemId, Model model) {
        Item item = itemRepository.findById(itemId);
        model.addAttribute("item", item);
        return "validation/v4/editForm";
    }

    @PostMapping("/{itemId}/edit")
    public String edit(@PathVariable Long itemId,
            @Validated @ModelAttribute("item") ItemUpdateForm form,
            BindingResult bindingResult,
            Model model) {
        if (bindingResult.hasErrors())
            return "validation/v4/editForm";

        Item item = Item.builder()
                .id(form.getId())
                .itemName(form.getItemName())
                .price(form.getPrice())
                .quantity(form.getQuantity())
                .build();

        itemRepository.update(itemId, item);
        return "redirect:/validation/v4/items/{itemId}";
    }

}
