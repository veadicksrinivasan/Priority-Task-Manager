# Priority Task Manager 🚀

A modern, feature-rich to-do list web application with priority-based task management, calendar view, countdown timer, and motivational animated characters.

## ✨ Features

### 🎯 Priority-Based Task Management
- Create tasks with **High**, **Medium**, or **Low** priority levels
- Visual priority indicators with color-coded badges
- Filter tasks by priority level
- Sort tasks automatically by priority

### 📅 Calendar View
- View all tasks in an interactive calendar interface
- Navigate between months easily
- See tasks organized by due date
- Color-coded tasks by priority level
- Today's date highlighted for reference

### ⏱️ Countdown Timer
- Set custom countdown times for priority tasks
- Start, pause, and reset functionality
- Large, easy-to-read display format (HH:MM:SS)
- Completion notification when timer reaches zero

### 🎭 Animated Motivational Characters
- **Male Character** with encouraging messages
- **Female Character** with motivational quotes
- Characters respond to task completion
- Varied motivational messages for continuous encouragement
- Smooth CSS animations

### 📚 Resource Collection
- Save important links and resources
- Quick access to relevant websites
- Organize resources with custom titles
- Easy management and deletion

### 📊 Task Statistics
- View total number of tasks
- Track completed tasks
- Monitor high-priority pending tasks
- Real-time updates

## 🛠️ Technical Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Storage**: Browser LocalStorage (no server required)
- **Animations**: CSS animations and JavaScript animation frames
- **Browser Compatibility**: Modern browsers (Chrome, Firefox, Safari, Edge)

## 📦 Project Structure

```
├── index.html          # Main application file
├── styles.css          # All styling and animations
├── script.js           # Application logic and interactivity
├── .github/
│   └── copilot-instructions.md  # Project documentation
└── README.md          # This file
```

## 🚀 Getting Started

### Installation
1. Clone or download this repository
2. No dependencies or build process required!

### Running the Application
Simply open `index.html` in any modern web browser:
- **File Method**: Double-click `index.html` to open in default browser
- **Local Server**: For best experience, serve via local server:
  ```bash
  # Using Python
  python -m http.server 8000
  
  # Using Node.js
  npx http-server
  
  # Using Live Server extension in VS Code
  # Right-click index.html → Open with Live Server
  ```

Then navigate to `http://localhost:8000` (or the appropriate port)

## 💡 How to Use

### Adding Tasks
1. Go to the **"Add Task"** tab
2. Fill in task details:
   - Task title (required)
   - Description (optional)
   - Priority level (High, Medium, Low)
   - Due date and time (optional)
3. Click **"Add Task"** button

### Managing Tasks
- **View Tasks**: Go to the **"Tasks"** tab to see all your tasks
- **Filter Tasks**: Use filter buttons to view tasks by priority or completion status
- **Complete Task**: Click the **"✓ Complete"** button to mark as done
- **Delete Task**: Click the **"🗑 Delete"** button to remove a task
- **Undo Completion**: Click **"↩ Undo"** on completed tasks to mark incomplete

### Using the Calendar
1. Click the **"Calendar"** tab
2. Navigate months using **"← Prev"** and **"Next →"** buttons
3. View tasks directly on their due dates
4. Color-coded tasks show priority levels

### Timer Management
1. Enter the number of minutes in the timer input field
2. Click **"Start"** to begin countdown
3. Use **"Pause"** to temporarily stop the timer
4. Click **"Reset"** to clear and restart
5. Get a notification when time is up!

### Managing Resources
1. Scroll to the **"📚 Resources"** section in the sidebar
2. Enter resource title and URL
3. Click **"Add"** to save
4. Click **"×"** button to remove a resource
5. Click on resource links to open in new tab

## 💾 Data Storage

All your tasks and resources are automatically saved to your browser's **LocalStorage**. This means:
- ✅ Data persists when you close the browser
- ✅ Each browser/device has separate data
- ✅ No account required
- ℹ️ Clearing browser cache will delete all data

## 🎨 Customization

### Colors
Edit the color values in `styles.css`:
- Primary color: `#667eea`
- Accent color: `#764ba2`
- Priority colors: High (`#e74c3c`), Medium (`#ffc93f`), Low (`#27ae60`)

### Character Animations
Modify motivational messages in `script.js`:
```javascript
this.motivationalMessages = [
    { male: 'Your message', female: 'Your message' },
    // Add more messages...
];
```

### Animations Speed
Adjust animation timing in `styles.css`:
- `animation: wave 1.5s ease-in-out infinite;` (change 1.5s)
- `animation: speechFade 3s ease-in-out infinite;` (change 3s)

## 🔧 Troubleshooting

### Data Not Saving
- Check if LocalStorage is enabled in your browser
- Try clearing browser cache and reloading
- Ensure cookies/storage is not blocked in privacy settings

### Animations Not Working
- Ensure JavaScript is enabled
- Update your browser to the latest version
- Try a different browser to confirm

### Timer Not Showing
- Refresh the page
- Check browser console for JavaScript errors (F12 → Console)

## 📱 Responsive Design

The application is fully responsive and works on:
- 🖥️ Desktop computers
- 💻 Tablets
- 📱 Mobile phones

## 🎯 Tips & Tricks

1. **Prioritize**: Mark high-priority tasks to stay focused
2. **Set Deadlines**: Use due dates and times to plan your day
3. **Use the Timer**: Focus on one task at a time with the countdown
4. **Collect Resources**: Save helpful links related to your tasks
5. **Track Progress**: Monitor completed tasks for motivation

## 🤝 Contributing

This is a standalone project. Feel free to fork and customize!

## 📄 License

Free to use and modify for personal or educational purposes.

## 🎉 Enjoy Your Productivity!

Start organizing your tasks and achieve your goals with the Priority Task Manager! Let the motivational characters guide you to success! 🚀

---

**Need Help?** Check the application's features by exploring each tab and trying the different functions. The intuitive interface guides you through every feature.
