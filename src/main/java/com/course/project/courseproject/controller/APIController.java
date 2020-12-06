package com.course.project.courseproject.controller;

import com.course.project.courseproject.model.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

@RestController
@RequestMapping("api")
public class APIController {
    private final RecipeRepository Recipes;
    final String AppID = "ae26ec97";
    final String AppKey = "ac9dd4d455e484d9ab5437b10b1b5c7c";


    @Autowired
    public APIController(RecipeRepository repo){
        this.Recipes = repo;
    }

    @GetMapping("{product}")
    public String Test(@PathVariable("product") String product) throws IOException {
        URL url = new URL(String.format("https://api.edamam.com/search?q=%s&app_id=%s&app_key=%s", product, AppID, AppKey));
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
