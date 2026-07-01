document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const homeScreen = document.getElementById('home-screen');
  const workoutScreen = document.getElementById('workout-screen');
  const daysContainer = document.getElementById('days-container');
  const exerciseContainer = document.getElementById('exercise-container');
  const backBtn = document.getElementById('back-btn');
  const headerTitle = document.getElementById('header-title');
  const modeButtons = document.querySelectorAll('.mode-btn');
  const resetBtn = document.getElementById('reset-btn');

  // State
  let currentDayId = null;
  let currentMode = 'full';
  
  // Progress tracking via localStorage
  const STORAGE_KEY = 'hybrid_workout_progress';
  let progress = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

  function saveProgress() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }

  // Initialization
  function init() {
    renderHome();
  }

  // Navigation
  function showHome() {
    workoutScreen.classList.remove('active');
    homeScreen.classList.add('active');
    backBtn.style.display = 'none';
    headerTitle.textContent = 'Hybrid Workout';
    currentDayId = null;
  }

  function showWorkout(dayId) {
    currentDayId = dayId;
    const dayData = workoutPlan.find(d => d.id === dayId);
    
    homeScreen.classList.remove('active');
    workoutScreen.classList.add('active');
    backBtn.style.display = 'flex';
    headerTitle.textContent = dayData.title.split(':')[0]; // Just 'Day 1'
    
    renderWorkout();
  }

  // Render Home Screen
  function renderHome() {
    daysContainer.innerHTML = '';
    workoutPlan.forEach(day => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <h2>${day.title}</h2>
        <p>${day.description}</p>
      `;
      card.addEventListener('click', () => showWorkout(day.id));
      daysContainer.appendChild(card);
    });
  }

  // Render Workout Screen
  function renderWorkout() {
    const dayData = workoutPlan.find(d => d.id === currentDayId);
    const exercises = dayData.modes[currentMode];
    
    exerciseContainer.innerHTML = '';

    // Ensure state object exists
    if (!progress[currentDayId]) progress[currentDayId] = {};
    if (!progress[currentDayId][currentMode]) progress[currentDayId][currentMode] = {};

    exercises.forEach((ex, exIndex) => {
      // Parse sets safely, assume standard max like 4 if it's '3-4'
      let numSets = parseInt(ex.sets.split('-').pop());
      if (isNaN(numSets)) numSets = parseInt(ex.sets); // Fallback
      
      const item = document.createElement('div');
      item.className = 'exercise-item';
      
      const header = document.createElement('div');
      header.className = 'exercise-header';
      header.innerHTML = `
        <img src="${ex.image}" alt="${ex.name}" class="exercise-image" loading="lazy" />
        <div class="exercise-title">${ex.name}</div>
        <div class="exercise-meta">${ex.sets} Sets • ${ex.reps} Reps</div>
      `;
      
      const setsContainer = document.createElement('div');
      setsContainer.className = 'sets-container';
      
      for (let s = 0; s < numSets; s++) {
        const btn = document.createElement('button');
        btn.className = 'set-btn';
        btn.textContent = s + 1;
        
        // Check if previously completed
        if (progress[currentDayId][currentMode][`${exIndex}_${s}`]) {
          btn.classList.add('completed');
        }

        btn.addEventListener('click', () => {
          btn.classList.toggle('completed');
          const isCompleted = btn.classList.contains('completed');
          progress[currentDayId][currentMode][`${exIndex}_${s}`] = isCompleted;
          saveProgress();
          
          // Haptic feedback if available
          if (navigator.vibrate && isCompleted) {
            navigator.vibrate(50);
          }
        });
        
        setsContainer.appendChild(btn);
      }
      
      item.appendChild(header);
      item.appendChild(setsContainer);
      exerciseContainer.appendChild(item);
    });
  }

  // Event Listeners
  backBtn.addEventListener('click', showHome);

  modeButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      modeButtons.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      currentMode = e.target.dataset.mode;
      renderWorkout();
    });
  });

  resetBtn.addEventListener('click', () => {
    if (confirm("Reset today's progress for this mode?")) {
      progress[currentDayId][currentMode] = {};
      saveProgress();
      renderWorkout();
    }
  });

  // Start app
  init();
});
