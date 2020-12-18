package com.course.project.courseproject.controller;

import com.course.project.courseproject.model.Recipe;
import com.course.project.courseproject.model.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("api")
public class APIController {
    private final RecipeRepository Recipes;
    final String AppID = "ae26ec97";
    final String AppKey = "ac9dd4d455e484d9ab5437b10b1b5c7c";
    private final Map<Long, Double> selectedRecipes = new HashMap<Long, Double>();

    @Autowired
    public APIController(RecipeRepository repo){
        this.Recipes = repo;
    }

    @GetMapping
    public List<Recipe> getSavedRecipes(){
        return Recipes.findAll();
    }

    @GetMapping("{total}/{calories}")
    public Double getTotalCalories(){
        Double res = 0.0;
        for(Map.Entry<Long, Double> pair : selectedRecipes.entrySet()){
            if(Recipes.findById(pair.getKey()).isPresent()) {
                res += Double.parseDouble(Recipes.findById(pair.getKey()).get().getFoodEnergy()) * pair.getValue() / 100;
            }
        }
        return res;
    }

    @PostMapping
    public Recipe saveRecipe(@RequestBody Recipe recipe){
        Recipes.save(recipe);
        return recipe;
    }


    @PostMapping("{id}/{grams}")
    public Optional<Recipe> acceptGrams(@PathVariable("id") Long id, @PathVariable("grams") Double grams){
        if(selectedRecipes.containsKey(id)){
            selectedRecipes.replace(id, grams);
        }
        else{
            selectedRecipes.put(id, grams);
        }
        return Recipes.findById(id);
    }

    @DeleteMapping("{id}")
    public Long deleteFromDB(@PathVariable("id") Long id){
        selectedRecipes.remove(id);
        selectedRecipes.forEach((k, v) -> System.out.println(k));
        Recipes.deleteById(id);
        return id;
    }

    @GetMapping("{product}")
    public String searchRecipes(@PathVariable("product") String product) throws IOException {
        product = product.replace(" ", "+");
        URL url = new URL(String.format("https://api.edamam.com/search?q=%s&ingr=25&app_id=%s&app_key=%s", product, AppID, AppKey));
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setRequestMethod("GET");
        connection.setRequestProperty("Content-Type", "application/json");
        connection.setConnectTimeout(5000);
        connection.setReadTimeout(5000);
        try(final BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()))){
            String inputLine;
            final StringBuilder content = new StringBuilder();
            while ((inputLine=  in.readLine()) != null){
                content.append(inputLine);
            }
            return content.toString();
        } catch (final Exception ex){
            ex.printStackTrace();
            return"";
        }
    }
}
