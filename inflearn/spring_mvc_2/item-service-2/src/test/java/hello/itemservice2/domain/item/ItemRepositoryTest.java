package hello.itemservice2.domain.item;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;

public class ItemRepositoryTest {
  ItemRepository itemRepository = new ItemRepository();

  @AfterEach
  void afterEach() {
    itemRepository.clearStore();
  }

  @Test
  void save() {
    // given
    Item item = new Item("itemA", 10000, 10);

    // when
    Item savedItem = itemRepository.save(item);

    // then
    Item foundItem = itemRepository.findById(item.getId());
    assertThat(savedItem).isEqualTo(foundItem);
  }

  @Test
  void findAll() {
    // given
    Item itemA = new Item("itemA", 10000, 10);
    Item itemB = new Item("itemB", 20000, 20);
    itemRepository.save(itemA);
    itemRepository.save(itemB);

    // when
    List<Item> foundList = itemRepository.findAll();

    // then
    assertThat(foundList.size()).isEqualTo(2);
    assertThat(foundList).contains(itemA, itemB);
  }

  @Test
  void updateItem() {
    // given
    Item item = new Item("itemA", 10000, 10);
    Item updateParam = new Item("itemB", 20000, 20);
    itemRepository.save(item);

    // when
    itemRepository.update(item.getId(), updateParam);

    // then
    assertThat(item.getItemName()).isEqualTo(updateParam.getItemName());
    assertThat(item.getPrice()).isEqualTo(updateParam.getPrice());
    assertThat(item.getQuantity()).isEqualTo(updateParam.getQuantity());
  }
}
