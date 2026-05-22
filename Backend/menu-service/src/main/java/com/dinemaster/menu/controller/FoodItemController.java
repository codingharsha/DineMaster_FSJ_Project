package com.dinemaster.menu.controller;

import com.dinemaster.menu.model.FoodItem;
import com.dinemaster.menu.service.FoodItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/menu")
@CrossOrigin(origins = "http://localhost:5173")
public class FoodItemController {

    @Autowired
    public FoodItemService service;

    @PostMapping("/add")
    public FoodItem addFood(@RequestBody FoodItem item){
        return service.addFoodItem(item);
    }

    @PostMapping("/add-bulk")
    public List<FoodItem> addBulkFood(@RequestBody List<FoodItem> items){
        return service.addBulkFoodItems(items);
    }

    @GetMapping("/all")
    public ResponseEntity<List<FoodItem>> getAllFood(){
        return new ResponseEntity<>(service.listAllFoodItems(),HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<FoodItem> getFoodByID(@PathVariable String id){
        FoodItem item = service.getFoodItembyId(id);
        if(item != null){
            return new ResponseEntity<>(item, HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/category/{category}")
    public List<FoodItem> getFoodByCategory(@PathVariable String category){
        return service.getFoodItemByCategory(category);
    }

    @PutMapping("/update/{id}")
    public FoodItem updateFood(@PathVariable String id, @RequestBody FoodItem newItem){
        return service.updateFoodItem(id, newItem);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteFood(@PathVariable String id){
        service.deleteFoodItem(id);
    }
}
