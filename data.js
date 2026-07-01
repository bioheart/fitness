const getLocalImage = (day, num, fallbackText) => {
  if (num) {
    return `images/day${day}_${num}.png`;
  }
  return `https://placehold.co/600x400/2c2c2c/bb86fc?text=${encodeURIComponent(fallbackText)}`;
};

const workoutPlan = [
  {
    id: 'day1',
    title: 'Day 1: Upper Anterior Focus',
    description: 'เน้นอก ไหล่ และหลังแขน',
    modes: {
      full: [
        { name: 'Barbell Bench Press', sets: '3-4', reps: '6-8', image: getLocalImage(1, 1) },
        { name: 'Incline Dumbbell Press', sets: '3', reps: '8-10', image: getLocalImage(1, 2) },
        { name: 'Overhead Press / Shoulder Press', sets: '3', reps: '6-10', image: getLocalImage(1, 3) },
        { name: 'Lateral Raise', sets: '3', reps: '12-15', image: getLocalImage(1, 4) },
        { name: 'Triceps Pushdown / Triceps Extension', sets: '3', reps: '10-15', image: getLocalImage(1, 5) },
        { name: 'Cable Row เบา ๆ', sets: '2-3', reps: '10-12', image: getLocalImage(1, 6) }
      ],
      lazy: [
        { name: 'Bench Press', sets: '3', reps: '6-8', image: getLocalImage(1, 1) },
        { name: 'Incline DB Press หรือ Shoulder Press', sets: '2-3', reps: '8-10', image: getLocalImage(1, 2) },
        { name: 'Triceps Pushdown หรือ Lateral Raise', sets: '2-3', reps: '10-15', image: getLocalImage(1, 5) }
      ],
      veryLazy: [
        { name: 'Bench Press', sets: '3', reps: '6-8', image: getLocalImage(1, 1) },
        { name: 'Lateral Raise', sets: '2-3', reps: '12-15', image: getLocalImage(1, 4) }
      ]
    }
  },
  {
    id: 'day2',
    title: 'Day 2: Lower Posterior Focus',
    description: 'เน้นก้น หลังขา และน่อง',
    modes: {
      full: [
        { name: 'Romanian Deadlift', sets: '3-4', reps: '6-8', image: getLocalImage(2, 1) },
        { name: 'Hip Thrust', sets: '3', reps: '8-10', image: getLocalImage(2, 2) },
        { name: 'Lying / Seated Leg Curl', sets: '3', reps: '10-12', image: getLocalImage(2, 3) },
        { name: 'Back Extension', sets: '2-3', reps: '10-15', image: getLocalImage(2, 4) },
        { name: 'Standing Calf Raise', sets: '4', reps: '10-15', image: getLocalImage(2, 5) }
      ],
      lazy: [
        { name: 'Romanian Deadlift', sets: '3', reps: '6-8', image: getLocalImage(2, 1) },
        { name: 'Lying / Seated Leg Curl', sets: '3', reps: '10-12', image: getLocalImage(2, 3) },
        { name: 'Standing Calf Raise', sets: '2-3', reps: '10-15', image: getLocalImage(2, 5) }
      ],
      veryLazy: [
        { name: 'Romanian Deadlift', sets: '3', reps: '6-8', image: getLocalImage(2, 1) },
        { name: 'Leg Curl', sets: '2-3', reps: '10-12', image: getLocalImage(2, 3) }
      ]
    }
  },
  {
    id: 'day3',
    title: 'Day 3: Upper Posterior Focus',
    description: 'เน้นหลัง ไหล่หลัง และหน้าแขน',
    modes: {
      full: [
        { name: 'Lat Pulldown / Pull-up', sets: '3-4', reps: '8-10', image: getLocalImage(3, 1) },
        { name: 'Barbell Row / Chest-supported Row', sets: '3', reps: '6-10', image: getLocalImage(3, 2) },
        { name: 'Seated Cable Row', sets: '3', reps: '10-12', image: getLocalImage(3, 3) },
        { name: 'Rear Delt Fly / Face Pull', sets: '3', reps: '12-15', image: getLocalImage(3, 4) },
        { name: 'Dumbbell Curl / Cable Curl', sets: '3', reps: '10-12', image: getLocalImage(3, 5) },
        { name: 'Hammer Curl', sets: '2', reps: '10-12', image: getLocalImage(3, 6) }
      ],
      lazy: [
        { name: 'Lat Pulldown / Pull-up', sets: '3', reps: '8-10', image: getLocalImage(3, 1) },
        { name: 'Seated Cable Row', sets: '3', reps: '10-12', image: getLocalImage(3, 3) },
        { name: 'Dumbbell Curl / Cable Curl', sets: '2-3', reps: '10-12', image: getLocalImage(3, 5) }
      ],
      veryLazy: [
        { name: 'Lat Pulldown', sets: '3', reps: '8-10', image: getLocalImage(3, 1) },
        { name: 'Seated Cable Row', sets: '3', reps: '10-12', image: getLocalImage(3, 3) }
      ]
    }
  },
  {
    id: 'day4',
    title: 'Day 4: Lower Anterior Focus',
    description: 'เน้นหน้าขาและแกนกลาง',
    modes: {
      full: [
        { name: 'Back Squat', sets: '3-4', reps: '5-8', image: getLocalImage(4, 1) },
        { name: 'Leg Press (เลือกเล่นสลับกับ Split Squat)', sets: '3', reps: '8-12', image: getLocalImage(4, 2) },
        { name: 'Bulgarian Split Squat (เลือกเล่นสลับกับ Leg Press)', sets: '3', reps: '8-12', image: getLocalImage(4, 4) },
        { name: 'Leg Extension', sets: '2-3', reps: '12-15', image: getLocalImage(4, 3) },
        { name: 'Crunch / Cable Crunch', sets: '3', reps: '12-15', image: getLocalImage(4, 5) },
        { name: 'Plank', sets: '2-3', reps: '30-60 วินาที', image: getLocalImage(4, 6) }
      ],
      lazy: [
        { name: 'Back Squat', sets: '3', reps: '5-8', image: getLocalImage(4, 1) },
        { name: 'Leg Press หรือ Bulgarian Split Squat', sets: '3', reps: '8-12', image: getLocalImage(4, 2) }, // Fallback to Leg Press card for combined
        { name: 'Leg Extension', sets: '3', reps: '12-15', image: getLocalImage(4, 3) },
        { name: 'Crunch / Cable Crunch', sets: '2-3', reps: '12-15', image: getLocalImage(4, 5) }
      ],
      veryLazy: [
        { name: 'Back Squat', sets: '3', reps: '5-8', image: getLocalImage(4, 1) },
        { name: 'Leg Extension', sets: '2-3', reps: '12-15', image: getLocalImage(4, 3) }
      ]
    }
  }
];
