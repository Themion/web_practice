package hello.itemservice.web.validation;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
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
        log.info(item.toString());

        if (!StringUtils.hasText(item.getItemName()))
            bindingResult.addError(new FieldError("item", "itemName", "상품 이름은 필수입니다."));

        if (item.getPrice() == null || item.getPrice() < 1_000 || item.getPrice() > 1_000_000)
            bindingResult.addError(new FieldError("item", "price", "가격은 1,000 ~ 1,000,000 까지 허용합니다."));

        if (item.getQuantity() == null || item.getQuantity() >= 9_999)
            bindingResult.addError(new FieldError("item", "quantity", "수량은 최대 9,999까지 허용합니다."));

        if (item.getPrice() != null && item.getQuantity() != null) {
            int totalPrice = item.getPrice() * item.getQuantity();
            if (totalPrice < 10_000)
                bindingResult.addError(
                        new ObjectError("item", "가격 * 수량의 합은 10,000 이상이어야 합니다. 현재 값 = " + totalPrice));
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
