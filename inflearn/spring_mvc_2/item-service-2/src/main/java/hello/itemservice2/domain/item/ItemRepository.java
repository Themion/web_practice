package hello.itemservice2.domain.item;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

@Repository
public class ItemRepository {
  // ConcurrentHashMap
  private static final Map<Long, Item> store = new HashMap<>();
  // AtomicLong
  private static long sequence = 0L;

  private Item _save(Item item) {
    store.put(item.getId(), item);
    return item;
  }

  public Item save(Item item) {
    item.setId(++sequence);
    return this._save(item);
  }

  public Item findById(Long id) {
    return store.get(id);
  }

  public List<Item> findAll() {
    return new ArrayList<>(store.values());
  }

  public void update(Long itemId, Item updateParam) {
    Item item = this.findById(itemId);
    item.setItemName(updateParam.getItemName());
    item.setPrice(updateParam.getPrice());
    item.setQuantity(updateParam.getQuantity());
    this._save(item);
  }

  public void clearStore() {
    store.clear();
  }
}
