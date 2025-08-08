// src/main/java/com/sweetshop/controller/SweetController.java
package com.sweetshop.sweetshop.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sweetshop.sweetshop.manager.SweetShopManager;
import com.sweetshop.sweetshop.model.Sweet;

@RestController
@RequestMapping("/api/sweets")
@CrossOrigin(origins = "http://localhost:3000")
public class SweetController {

    private final SweetShopManager sweetShopManager;

    public SweetController(SweetShopManager sweetShopManager) {
        this.sweetShopManager = sweetShopManager;
        // Populate with some initial data for testing the frontend
        if (sweetShopManager.getAllSweets().isEmpty()) {
            sweetShopManager.addSweet(new Sweet("1001", "Kaju Katli", "Nut-Based", 50.0, 20));
            sweetShopManager.addSweet(new Sweet("1002", "Gajar Halwa", "Vegetable-Based", 30.0, 15));
            sweetShopManager.addSweet(new Sweet("1003", "Gulab Jamun", "Milk-Based", 10.0, 50));
            sweetShopManager.addSweet(new Sweet("1004", "Rasgulla", "Milk-Based", 12.0, 30));
        }
    }

    @GetMapping
    public ResponseEntity<List<Sweet>> getAllSweets() {
        return ResponseEntity.ok(sweetShopManager.getAllSweets());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Sweet> getSweetById(@PathVariable String id) {
        Sweet sweet = sweetShopManager.getSweetById(id);
        if (sweet != null) {
            return ResponseEntity.ok(sweet);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<Sweet> addSweet(@RequestBody Sweet sweet) {
        try {
            sweetShopManager.addSweet(sweet);
            return ResponseEntity.status(HttpStatus.CREATED).body(sweet);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null); // Or return error details
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Sweet> updateSweet(@PathVariable String id, @RequestBody Sweet sweet) {
        try {
            sweetShopManager.updateSweet(id, sweet);
            return ResponseEntity.ok(sweet);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSweet(@PathVariable String id) {
        try {
            sweetShopManager.deleteSweet(id);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/{id}/purchase")
    public ResponseEntity<Sweet> purchaseSweet(@PathVariable String id, @RequestParam int quantity) {
        try {
            sweetShopManager.purchaseSweet(id, quantity);
            return ResponseEntity.ok(sweetShopManager.getSweetById(id));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PostMapping("/{id}/restock")
    public ResponseEntity<Sweet> restockSweet(@PathVariable String id, @RequestParam int quantity) {
        try {
            sweetShopManager.restockSweet(id, quantity);
            return ResponseEntity.ok(sweetShopManager.getSweetById(id));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @GetMapping("/search")
    public ResponseEntity<List<Sweet>> searchSweets(
            @RequestParam(required = false) String searchTerm,
            @RequestParam(required = false) String searchBy,
            @RequestParam(required = false, defaultValue = "0") double minPrice,
            @RequestParam(required = false, defaultValue = "0") double maxPrice) {
        List<Sweet> results = sweetShopManager.searchSweets(searchTerm, searchBy, minPrice, maxPrice);
        return ResponseEntity.ok(results);
    }

    @GetMapping("/sort")
    public ResponseEntity<List<Sweet>> sortSweets(
            @RequestParam(defaultValue = "name") String sortBy,
            @RequestParam(defaultValue = "asc") String order) {
        List<Sweet> results = sweetShopManager.sortSweets(sortBy, order);
        return ResponseEntity.ok(results);
    }
}