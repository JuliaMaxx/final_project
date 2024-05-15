# CS50W — Final Project: Workout
## Video Demo: https://www.youtube.com/watch?v=AoUfKmqRUQM
## Deployed version: https://julsmx.pythonanywhere.com/
![image](https://github.com/JuliaMaxx/final_project/assets/121096183/f21d5fef-f05b-4462-aa71-e5b6c4bfce8d)

# Welcome to Workout!

Workout is a Django-based website designed to provide users with customizable interval workouts accompanied by their choice of music. It also conveniently maintains a log of all completed workouts.

## Why Workout?

After searching extensively online, I couldn't find a platform that offered the exact features I desired for managing my workouts efficiently. So, I took matters into my own hands and created Workout to streamline my fitness routine.

## Skills Developed:

Creating Workout wasn't just about functionality; I wanted it to be visually appealing and user-friendly. To achieve this, I delved deeper into front-end development, enhancing my skills in Sass, CSS, and UI/UX design using Figma. Additionally, I learned to craft unique logos and favicons to give Workout its own identity. Dealing with audio files and implementing features like workout interval timers added another layer of complexity to my learning journey.

## Figma Design:

To ensure a sleek and modern interface, I meticulously designed Workout's layout and elements using Figma. The result is an aesthetically pleasing user experience tailored for maximum usability.

![Screenshot of Figma design](Screenshot.png)

## Distinctiveness and Complexity:

Workout stands out from my previous projects due to its heavy emphasis on UI/UX and front-end development. It incorporates iframes and audio management, which presented new challenges and learning opportunities. Designing a functional workout interval timer with sound effects added complexity, making this project a significant milestone in my skill development journey.

## File Structure:

- **`media`**: Directory for user-uploaded mp3 files.
- **`views.py`**: Contains project views and form for submitting mp3 files.
- **`models.py`**: Defines User and Workout models.
- **`urls.py`**: Manages website URLs.
- **`admin.py`**: Registers models with Django admin interface.
- **`static`**:
    - **`mp3`**: Sound effect files.
    - **`images`**: Logo, favicon, and icon images.
    - **`scripts`**: JavaScript files for managing music and workout timer.
    - **`styles`**: SCSS files for styling website components.
- **`templates`**: HTML templates for website pages.

## Running the App:

To run Workout locally:

1. Install Django.
2. Navigate to the project directory (`final_project`) in the terminal.
3. Run `python3 manage.py runserver`.

Alternatively, you can access the deployed website directly at [https://julsmx.pythonanywhere.com/](https://julsmx.pythonanywhere.com/).
