package com.dinemaster.menu.service;

import com.dinemaster.menu.model.FoodItem;
import com.dinemaster.menu.repository.FoodItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FoodItemService {

    @Autowired
    public FoodItemRepository repository;

    public FoodItem addFoodItem(FoodItem item){
        item.setAvailable(true);
        return repository.save(item);
    }

    public List<FoodItem> addBulkFoodItems(List<FoodItem> items){
        items.forEach(item -> item.setAvailable(true));
        return repository.saveAll(items);
    }

    public List<FoodItem> listAllFoodItems(){
        List<FoodItem> items = repository.findAll();
        System.out.println("FOOD ITEMS COUNT = " + items.size());
        System.out.println(items);
        return items;
    }

    public FoodItem getFoodItembyId(String id){
        return repository.findById(id).orElse(null);
    }

    public List<FoodItem> getFoodItemByCategory(String category){
        return repository.findByCategory(category);
    }

    public FoodItem updateFoodItem(String id, FoodItem newItem){
        return repository.findById(id).map(item -> {
            item.setName(newItem.getName());
            item.setDescription(newItem.getDescription());
            item.setPrice(newItem.getPrice());
            item.setCategory(newItem.getCategory());
            item.setImgUrl(newItem.getImgUrl());
            item.setAvailable(newItem.isAvailable());
            return repository.save(item);
        }).orElseThrow(() -> new RuntimeException("No Food Item found for the given id"));
    }

    public void deleteFoodItem(String id){
        repository.deleteById(id);
    }
}
