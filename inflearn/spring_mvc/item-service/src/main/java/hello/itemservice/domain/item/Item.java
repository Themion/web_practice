package hello.itemservice.domain.item;

import lombok.Data;

@Data
public class Item {
  private Long id;
  private String itemName;
  private Integer price;
  private Integer quantity = 0;

  public Item() {
  }

  public Item(String itemName, int price, int quantity) {
    this.itemName = itemName;
    this.price = price;
    this.quantity = quantity;
  }
}
