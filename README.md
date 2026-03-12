# UNC Charlotte Dining API

API for accessing and organizing dining hall menu data from UNC Charlotte’s **Dine on Campus** system. The goal of this project is to create a clean, structured backend that allows applications to easily use campus dining information.

---

## Project Overview

UNC Charlotte dining halls publish daily menus through public endpoints on the Dine on Campus website. This project builds an API that collects that data and organizes it into a structured database so it can be easily accessed by other applications.

By building a standardized API around dining hall data, we enable developers to build tools that improve the campus dining experience.

Potential applications include:

- Notifications when a user’s favorite food appears on a menu
- Meal recommendations based on health or nutrition goals
- Tracking calories and macronutrients from dining hall meals
- Tools for exploring campus dining options

The system periodically pulls menu data from public sources and stores it in our database for use by clients.

---

## Core Data Model

The API is built around several main resources.

### DiningLocation
Represents a dining hall or restaurant on campus.

Examples include:
- SoVi
- Social 704

Each dining location contains multiple menus that change daily.

### Menu
Menus represent a specific meal offering at a dining location for a particular date and meal type.

For example, a dining hall may have separate menus for:
- Breakfast
- Lunch
- Dinner

Menus contain multiple food items.

### FoodItem
Food items represent individual foods available on a menu.

Each item includes metadata such as:
- ingredients
- allergens
- nutrition information
- vegetarian / vegan indicators
- portion size

### User
Users interact with the system by:

- saving favorite foods
- setting dietary preferences
- receiving notifications when foods appear on menus

---

## Authentication

User authentication is handled using **JWT (JSON Web Tokens)**.

Users can register and log in to obtain a token. This token is used to access protected features such as saving favorite foods and managing preferences.

Certain administrative actions are restricted to users with admin privileges.

---

## Testing Strategy

The project includes tests to ensure that the API behaves correctly and that data is stored and retrieved properly.

Testing focuses on:

- authentication and login behavior
- creation and retrieval of menu data
- managing food items
- user features such as favorites
- database consistency

These tests help verify both normal operation and error cases.

---

## Team Responsibilities

| Responsibility | Team Member |
|---|---|
| Database Setup | Eric Fackelman |
| Authentication | Jay Harrison |
| Testing | Jesus Geronimo-Guevera |
| Deployment | Liam McCracken |
| CRUD Operations | Shared among all members |

---

## Future Improvements

Possible extensions of this project include:

- automatic notifications for favorite foods
- personalized meal planning
- nutrition tracking dashboards
- integration with fitness or health apps
- recommendation systems for dining choices

---

## Purpose

This project demonstrates the design and implementation of a RESTful API, including database modeling, authentication, testing, and deployment, while solving a practical problem related to campus dining services.
