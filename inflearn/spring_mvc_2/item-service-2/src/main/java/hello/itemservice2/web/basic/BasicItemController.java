package hello.itemservice2.web.basic;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import hello.itemservice2.domain.item.Item;
import hello.itemservice2.domain.item.ItemRepository;
import hello.itemservice2.domain.item.ItemType;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("/basic/items")
@RequiredArgsConstructor
public class BasicItemController {

  private final ItemRepository itemRepository;
  private static final Map<String, String> regions = new LinkedHashMap<>();

  @ModelAttribute("regions")
  public Map<String, String> regions() {
    return regions;
  };

  @ModelAttribute("itemTypes")
  public ItemType[] itemTypes() {
    return ItemType.values();
  }

  /*
   * 테스트용 데이터 추가
   */
  @PostConstruct
  public void init() {
    itemRepository.save(new Item("itemA", 10000, 10));
    itemRepository.save(new Item("itemB", 20000, 20));

    regions.put("SEOUL", "서울");
    regions.put("BUSAN", "부산");
    regions.put("JEJU", "제주");
  }

  @GetMapping
  public String items(Model model) {
    List<Item> items = itemRepository.findAll();
    model.addAttribute("items", items);
    return "basic/items";
  }

  @GetMapping("/{itemId}")
  public String item(@PathVariable long itemId, Model model) {
    Item item = itemRepository.findById(itemId);
    model.addAttribute("item", item);
    return "basic/item";
  }

  @GetMapping("/add")
  public String addForm(Model model) {
    model.addAttribute("item", new Item());
    return "basic/addForm";
  }

  @PostMapping("/add")
  public String save(@ModelAttribute Item item, RedirectAttributes redirectAttributes) {
    log.info("item: {}", item);

    Item savedItem = itemRepository.save(item);
    redirectAttributes.addAttribute("itemId", savedItem.getId());
    redirectAttributes.addAttribute("status", true);
    return "redirect:/basic/items/{itemId}";
  }

  @GetMapping("/{itemId}/edit")
  public String editForm(@PathVariable long itemId, Model model) {
    Item item = itemRepository.findById(itemId);
    model.addAttribute("item", item);
    return "basic/editForm";
  }

  @PostMapping("/{itemId}/edit")
  public String update(@PathVariable long itemId, @ModelAttribute Item item) {
    Item updatedItem = itemRepository.update(itemId, item);
    log.info("item: {}", updatedItem);
    return "redirect:/basic/items/{itemId}";
  }
}
