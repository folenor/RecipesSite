package com.course.project.courseproject.model;


import javax.persistence.*;

@Entity
@Table(name="recepies")
public class Recipe {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private String id;
}
