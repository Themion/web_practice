package hello.itemservice.domain.item;

import javax.validation.constraints.Max;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Range;

import lombok.Data;

@Data
public class Item {

    private Long id;

    @NotBlank(message = "공백X")
    private String itemName;

    @NotNull
    @Range(min = 1_000, max = 1_000_000)
    private Integer price;

    @NotNull
    @Max(9_999)
    private Integer quantity;

    public Item() {
    }

    public Item(String itemName, Integer price, Integer quantity) {
        this.itemName = itemName;
        this.price = price;
        this.quantity = quantity;
    }
}
