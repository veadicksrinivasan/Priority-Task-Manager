// Task Management System
class TaskManager {
    constructor() {
        this.tasks = this.loadTasks();
        this.resources = this.loadResources();
        this.timerInterval = null;
        this.timerSeconds = 0;
        this.currentFilter = 'all';
        this.currentDate = new Date();
        this.motivationalMessages = [
            { male: '💪 You got this!', female: '🌟 Amazing work!' },
            { male: '🚀 Keep pushing!', female: '✨ Keep it up!' },
            { male: '⭐ Great job!', female: '🎉 Fantastic!' },
            { male: '🔥 On fire!', female: '💖 Loving it!' },
            { male: '💪 Almost there!', female: '🏆 Champion!' }
        ];
        this.currentMessageIndex = 0;
        this.initializeEventListeners();
        this.render();
    }

    // LocalStorage Management
    loadTasks() {
        const saved = localStorage.getItem('tasks');
        return saved ? JSON.parse(saved) : [];
    }

    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    loadResources() {
        const saved = localStorage.getItem('resources');
        return saved ? JSON.parse(saved) : [];
    }

    saveResources() {
        localStorage.setItem('resources', JSON.stringify(this.resources));
    }

    // Event Listeners
    initializeEventListeners() {
        // Task Form
        document.getElementById('taskForm').addEventListener('submit', (e) => this.addTask(e));

        // Tab Navigation
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.switchTab(e.target.dataset.tab));
        });

        // Filter Controls
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.filterTasks(e.target.dataset.filter));
        });

        // Timer Controls
        document.getElementById('startTimer').addEventListener('click', () => this.startTimer());
        document.getElementById('pauseTimer').addEventListener('click', () => this.pauseTimer());
        document.getElementById('resetTimer').addEventListener('click', () => this.resetTimer());

        // Resources
        document.getElementById('addResource').addEventListener('click', () => this.addResource());
        document.getElementById('resourceUrl').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addResource();
        });

        // Calendar Navigation
        document.getElementById('prevMonth').addEventListener('click', () => this.previousMonth());
        document.getElementById('nextMonth').addEventListener('click', () => this.nextMonth());

        // Update calendar on month change
        document.getElementById('taskDate').addEventListener('change', () => {
            const selectedDate = document.getElementById('taskDate').value;
            if (selectedDate) {
                this.currentDate = new Date(selectedDate);
                this.renderCalendar();
            }
        });
    }

    // Task Management
    addTask(e) {
        e.preventDefault();

        const newTask = {
            id: Date.now(),
            title: document.getElementById('taskTitle').value,
            description: document.getElementById('taskDescription').value,
            priority: document.getElementById('taskPriority').value,
            dueDate: document.getElementById('taskDate').value,
            dueTime: document.getElementById('taskTime').value,
            completed: false,
            createdAt: new Date().toISOString()
        };

        this.tasks.push(newTask);
        this.saveTasks();
        document.getElementById('taskForm').reset();
        this.renderTasks();
        this.renderCalendar();
        this.updateStats();
        this.triggerCharacterAnimation();

        // Show success message
        this.showNotification('Task added successfully! 🎉');
    }

    deleteTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.saveTasks();
        this.renderTasks();
        this.renderCalendar();
        this.updateStats();
    }

    toggleTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
            this.saveTasks();
            this.renderTasks();
            this.renderCalendar();
            this.updateStats();
            
            if (task.completed) {
                this.triggerCharacterAnimation();
            }
        }
    }

    // Filtering
    filterTasks(filter) {
        this.currentFilter = filter;
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        event.target.classList.add('active');
        this.renderTasks();
    }

    getFilteredTasks() {
        let filtered = this.tasks;

        if (this.currentFilter === 'high') {
            filtered = filtered.filter(t => t.priority === 'high');
        } else if (this.currentFilter === 'medium') {
            filtered = filtered.filter(t => t.priority === 'medium');
        } else if (this.currentFilter === 'low') {
            filtered = filtered.filter(t => t.priority === 'low');
        } else if (this.currentFilter === 'completed') {
            filtered = filtered.filter(t => t.completed);
        } else if (this.currentFilter === 'all') {
            // Show incomplete tasks only
            filtered = filtered.filter(t => !t.completed);
        }

        return filtered.sort((a, b) => {
            const priorityOrder = { high: 1, medium: 2, low: 3 };
            return priorityOrder[a.priority] - priorityOrder[b.priority];
        });
    }

    // Rendering
    renderTasks() {
        const tasksList = document.getElementById('tasksList');
        const filtered = this.getFilteredTasks();

        if (filtered.length === 0) {
            tasksList.innerHTML = '<li style="padding: 20px; text-align: center; color: #999;">No tasks found. Create one to get started! 🚀</li>';
            return;
        }

        tasksList.innerHTML = filtered.map(task => `
            <li class="task-item ${task.priority} ${task.completed ? 'completed' : ''}">
                <div class="task-content">
                    <div class="task-title">${this.escapeHtml(task.title)}</div>
                    ${task.description ? `<div class="task-description">${this.escapeHtml(task.description)}</div>` : ''}
                    <div class="task-meta">
                        <span class="priority-badge ${task.priority}">${task.priority.toUpperCase()}</span>
                        ${task.dueDate ? `<span>📅 ${new Date(task.dueDate).toLocaleDateString()}</span>` : ''}
                        ${task.dueTime ? `<span>🕐 ${task.dueTime}</span>` : ''}
                    </div>
                </div>
                <div class="task-actions">
                    <button class="task-btn ${task.completed ? 'undo' : 'complete'}" onclick="taskManager.toggleTask(${task.id})">
                        ${task.completed ? '↩ Undo' : '✓ Complete'}
                    </button>
                    <button class="task-btn delete" onclick="taskManager.deleteTask(${task.id})">🗑 Delete</button>
                </div>
            </li>
        `).join('');
    }

    renderCalendar() {
        const year = this.currentDate.getFullYear();
        const month = this.currentDate.getMonth();

        // Update month/year display
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                           'July', 'August', 'September', 'October', 'November', 'December'];
        document.getElementById('monthYear').textContent = `${monthNames[month]} ${year}`;

        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();

        let calendarHtml = '';
        
        // Day headers
        const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        dayNames.forEach(day => {
            calendarHtml += `<div class="calendar-header">${day}</div>`;
        });

        // Empty cells for days before month starts
        for (let i = 0; i < startingDayOfWeek; i++) {
            calendarHtml += '<div class="calendar-day other-month"></div>';
        }

        // Days of the month
        const today = new Date();
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day);
            const dateStr = date.toISOString().split('T')[0];
            
            const isToday = date.toDateString() === today.toDateString();
            const dayTasks = this.tasks.filter(t => t.dueDate === dateStr);

            calendarHtml += `
                <div class="calendar-day ${isToday ? 'today' : ''}">
                    <div class="calendar-day-num">${day}</div>
                    <div class="calendar-tasks">
                        ${dayTasks.map(task => 
                            `<div class="calendar-task ${task.priority}" title="${this.escapeHtml(task.title)}">${this.escapeHtml(task.title.substring(0, 15))}</div>`
                        ).join('')}
                    </div>
                </div>
            `;
        }

        document.getElementById('calendarContainer').innerHTML = calendarHtml;
    }

    previousMonth() {
        this.currentDate.setMonth(this.currentDate.getMonth() - 1);
        this.renderCalendar();
    }

    nextMonth() {
        this.currentDate.setMonth(this.currentDate.getMonth() + 1);
        this.renderCalendar();
    }

    // Stats Update
    updateStats() {
        const total = this.tasks.length;
        const completed = this.tasks.filter(t => t.completed).length;
        const highPriority = this.tasks.filter(t => t.priority === 'high' && !t.completed).length;

        document.getElementById('totalTasks').textContent = total;
        document.getElementById('completedTasks').textContent = completed;
        document.getElementById('highPriorityCount').textContent = highPriority;
    }

    // Timer Management
    startTimer() {
        if (this.timerInterval) return;

        const minutes = parseInt(document.getElementById('timerMinutes').value) || 0;
        if (minutes === 0 && this.timerSeconds === 0) {
            this.showNotification('Please enter minutes to start the timer');
            return;
        }

        if (this.timerSeconds === 0) {
            this.timerSeconds = minutes * 60;
        }

        this.timerInterval = setInterval(() => {
            this.timerSeconds--;
            this.updateTimerDisplay();

            if (this.timerSeconds <= 0) {
                clearInterval(this.timerInterval);
                this.timerInterval = null;
                this.showNotification('⏰ Time is up! Great job!');
                this.triggerCharacterAnimation();
            }
        }, 1000);
    }

    pauseTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }

    resetTimer() {
        clearInterval(this.timerInterval);
        this.timerInterval = null;
        this.timerSeconds = 0;
        document.getElementById('timerMinutes').value = '';
        this.updateTimerDisplay();
    }

    updateTimerDisplay() {
        const hours = Math.floor(this.timerSeconds / 3600);
        const minutes = Math.floor((this.timerSeconds % 3600) / 60);
        const seconds = this.timerSeconds % 60;

        document.getElementById('timerDisplay').textContent =
            `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    // Resources Management
    addResource() {
        const title = document.getElementById('resourceTitle').value.trim();
        const url = document.getElementById('resourceUrl').value.trim();

        if (!title || !url) {
            this.showNotification('Please fill in both title and URL');
            return;
        }

        // Validate URL
        try {
            new URL(url);
        } catch (e) {
            this.showNotification('Please enter a valid URL');
            return;
        }

        this.resources.push({
            id: Date.now(),
            title,
            url,
            addedAt: new Date().toISOString()
        });

        this.saveResources();
        document.getElementById('resourceTitle').value = '';
        document.getElementById('resourceUrl').value = '';
        this.renderResources();
        this.showNotification('Resource added! 📚');
    }

    deleteResource(id) {
        this.resources = this.resources.filter(r => r.id !== id);
        this.saveResources();
        this.renderResources();
    }

    renderResources() {
        const resourcesList = document.getElementById('resourcesList');
        
        if (this.resources.length === 0) {
            resourcesList.innerHTML = '<p style="color: #999; font-size: 0.85em;">No resources yet</p>';
            return;
        }

        resourcesList.innerHTML = this.resources.map(resource => `
            <div class="resource-item">
                <a href="${resource.url}" target="_blank" rel="noopener noreferrer" title="${this.escapeHtml(resource.title)}">
                    ${this.escapeHtml(resource.title)}
                </a>
                <button onclick="taskManager.deleteResource(${resource.id})">×</button>
            </div>
        `).join('');
    }

    // Tab Switching
    switchTab(tabName) {
        document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        
        document.getElementById(tabName).classList.add('active');
        event.target.classList.add('active');

        if (tabName === 'calendar') {
            this.renderCalendar();
        }
    }

    // Character Animation
    triggerCharacterAnimation() {
        const messages = this.motivationalMessages[this.currentMessageIndex];
        this.currentMessageIndex = (this.currentMessageIndex + 1) % this.motivationalMessages.length;

        const maleSpeech = document.getElementById('maleSpeech');
        const femaleSpeech = document.getElementById('femaleSpeech');

        if (maleSpeech) maleSpeech.textContent = messages.male;
        if (femaleSpeech) femaleSpeech.textContent = messages.female;

        // Trigger animation by removing and re-adding animation
        const chars = document.querySelectorAll('.character');
        chars.forEach(char => {
            char.style.animation = 'none';
            setTimeout(() => {
                char.style.animation = '';
            }, 10);
        });
    }

    // Utilities
    escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, m => map[m]);
    }

    showNotification(message) {
        // Simple alert-style notification
        // In a production app, you'd use a toast library
        console.log(message);
    }

    // Initial render
    render() {
        this.renderTasks();
        this.renderResources();
        this.renderCalendar();
        this.updateStats();
        this.updateTimerDisplay();
    }
}

// Initialize the app when DOM is ready
let taskManager;
document.addEventListener('DOMContentLoaded', () => {
    taskManager = new TaskManager();
    
    // Show welcome message
    setTimeout(() => {
        taskManager.triggerCharacterAnimation();
    }, 500);
});
