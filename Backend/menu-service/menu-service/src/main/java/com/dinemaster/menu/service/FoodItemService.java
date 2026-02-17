package com.dinemaster.menu.service;

import com.dinemaster.menu.model.FoodItem;
import com.dinemaster.menu.repository.FoodItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FoodItemService {

    @Autowired
    public FoodItemRepository repository;

    public FoodItem addFoodItem(FoodItem item){
        return repository.save(item);
    }

    public List<FoodItem> listAllFoodItems(){
        return repository.findAll();
    }

    public FoodItem getFoodItembyId(String id){
        return repository.findById(id).orElse(null);
    }

    public List<FoodItem> getFoodItemByCategory(String category){
        return repository.findByCategory(category);
    }

    public FoodItem updateFoodItem(String id, FoodItem newItem){
        return repository.findById(id).map(item -> {
            item.setId(newItem.getId());
            item.setName(newItem.getName());
            item.setDescription(newItem.getDescription());
            item.setPrice(newItem.getPrice());
            item.setImgUrl(newItem.getImgUrl());
            item.setAvailable(newItem.isAvailable());
            return repository.save(item);
        }).orElseThrow(() -> new RuntimeException("No Food Item found for the given id"));
    }

    public void deleteFoodItem(String id){
        repository.deleteById(id);
    }
}
