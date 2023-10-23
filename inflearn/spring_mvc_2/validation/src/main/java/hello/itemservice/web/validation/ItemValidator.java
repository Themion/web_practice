package hello.itemservice.web.validation;

import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.ValidationUtils;
import org.springframework.validation.Validator;

import hello.itemservice.domain.item.Item;

@Component
public class ItemValidator implements Validator {

    @Override
    public boolean supports(Class<?> clazz) {
        // clazz가 Item 혹은 Item을 상속받은 클래스인지 확인
        return Item.class.isAssignableFrom(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        Item item = (Item) target;

        int minPrice = 1_000, maxPrice = 1_000_000, maxQuantity = 9_999, minTotalPrice = 10_000;

        ValidationUtils.rejectIfEmptyOrWhitespace(errors, "itemName", "required");
        if (item.getPrice() == null || item.getPrice() < minPrice || item.getPrice() > maxPrice)
            errors.rejectValue("price", "range", new Object[] { minPrice, maxPrice }, null);
        if (item.getQuantity() == null || item.getQuantity() >= maxQuantity)
            errors.rejectValue("quantity", "max", new Object[] { maxQuantity }, null);

        if (item.getPrice() != null && item.getQuantity() != null) {
            int totalPrice = item.getPrice() * item.getQuantity();
            if (totalPrice < minTotalPrice)
                errors.reject("totalPriceMin", new Object[] { minTotalPrice, totalPrice }, null);
        }
    }

}
