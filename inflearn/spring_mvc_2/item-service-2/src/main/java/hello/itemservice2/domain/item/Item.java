package hello.itemservice2.domain.item;

import java.util.List;

import lombok.Data;

@Data
public class Item {
  private Long id;
  private String itemName;
  private Integer price;
  private Integer quantity = 0;

  private Boolean open;
  private List<String> regions;
  private ItemType itemType;
  private String deliveryCode;

  public Item() {
  }

  public Item(String itemName, int price, int quantity) {
    this.itemName = itemName;
    this.price = price;
    this.quantity = quantity;
  }
}
