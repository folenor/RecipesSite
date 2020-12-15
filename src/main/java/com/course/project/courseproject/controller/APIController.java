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
    private final Map<Optional<Recipe>, Double> selectedRecipes = new HashMap<Optional<Recipe>, Double>();

    @Autowired
    public APIController(RecipeRepository repo){
        this.Recipes = repo;
    }
    @GetMapping
    public List<Recipe> getSavedRecipes(){
        return Recipes.findAll();
    }

    @PostMapping
    public Recipe saveRecipe(@RequestBody Recipe recipe){
        return Recipes.save(recipe);
    }
    @PostMapping("{id}/{grams}")
    public Optional<Recipe> acceptGrams(@PathVariable("id") Long id, @PathVariable("grams") Double grams){
        System.out.println(grams);
        selectedRecipes.put(Recipes.findById(id), grams);
        return Recipes.findById(id);
    }

    @DeleteMapping("{id}")
    public Optional<Recipe> deleteFromDB(@PathVariable("id") Long id){
        Optional<Recipe> rec = Recipes.findById(id);
        selectedRecipes.remove(rec);
        Recipes.deleteById(id);
        return rec;
    }

    @GetMapping("{product}")
    public String searchRecipes(@PathVariable("product") String product) throws IOException {
        System.out.println(product);
        product = product.replace(" ", "+");
        System.out.println(product);
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
