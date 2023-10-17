package hello.itemservice.web.validation;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import hello.itemservice.domain.item.Item;
import hello.itemservice.domain.item.ItemRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("/validation/v2/items")
@RequiredArgsConstructor
public class ValidationItemControllerV2 {

    private final ItemRepository itemRepository;

    private BindingResult validateItem(Item item, BindingResult bindingResult) {
        log.info("objectName={}", bindingResult.getObjectName());
        log.info("target={}", bindingResult.getTarget());

        int minPrice = 1_000, maxPrice = 1_000_000, maxQuantity = 9_999, minTotalPrice = 10_000;

        if (!StringUtils.hasText(item.getItemName()))
            bindingResult.rejectValue("itemName", "required");
        if (item.getPrice() == null || item.getPrice() < minPrice || item.getPrice() > maxPrice)
            bindingResult.rejectValue("price", "range", new Object[] { minPrice, maxPrice }, null);
        if (item.getQuantity() == null || item.getQuantity() >= maxQuantity)
            bindingResult.rejectValue("quantity", "max", new Object[] { maxQuantity }, null);

        if (item.getPrice() != null && item.getQuantity() != null) {
            int totalPrice = item.getPrice() * item.getQuantity();
            if (totalPrice < minTotalPrice)
                bindingResult.reject("totalPriceMin", new Object[] { minTotalPrice, totalPrice }, null);
        }
        log.info("bindingResult = {}", bindingResult);

        return bindingResult;
    }

    @GetMapping
    public String items(Model model) {
        List<Item> items = itemRepository.findAll();
        model.addAttribute("items", items);
        return "validation/v2/items";
    }

    @GetMapping("/{itemId}")
    public String item(@PathVariable long itemId, Model model) {
        Item item = itemRepository.findById(itemId);
        model.addAttribute("item", item);
        return "validation/v2/item";
    }

    @GetMapping("/add")
    public String addForm(Model model) {
        model.addAttribute("item", new Item());
        return "validation/v2/addForm";
    }

    @PostMapping("/add")
    public String addItemV1(@ModelAttribute Item item, BindingResult bindingResult,
            RedirectAttributes redirectAttributes,
            Model model) {
        bindingResult = validateItem(item, bindingResult);
        if (bindingResult.hasErrors())
            return "validation/v2/addForm";

        Item savedItem = itemRepository.save(item);

        redirectAttributes.addAttribute("itemId", savedItem.getId());
        redirectAttributes.addAttribute("status", true);
        return "redirect:/validation/v2/items/{itemId}";
    }

    @GetMapping("/{itemId}/edit")
    public String editForm(@PathVariable Long itemId, Model model) {
        Item item = itemRepository.findById(itemId);
        model.addAttribute("item", item);
        return "validation/v2/editForm";
    }

    @PostMapping("/{itemId}/edit")
    public String editV1(@PathVariable Long itemId, @ModelAttribute Item item, BindingResult bindingResult,
            Model model) {
        bindingResult = validateItem(item, bindingResult);
        if (bindingResult.hasErrors())
            return "validation/v2/editForm";

        itemRepository.update(itemId, item);
        return "redirect:/validation/v2/items/{itemId}";
    }

}
