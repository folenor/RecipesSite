package com.course.project.courseproject.model;


import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Entity
@Table(name="recepies")
public class Recipe {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImageSource() {
        return imageSource;
    }

    public void setImageSource(String imageSource) {
        this.imageSource = imageSource;
    }

    public String getFoodEnergy() {
        return foodEnergy;
    }

    public void setFoodEnergy(String foodEnergy) {
        this.foodEnergy = foodEnergy;
    }

    private String imageSource;

    private String foodEnergy;
}
