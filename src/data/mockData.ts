import { StudentProfile, Exercise, TopicProgress, Achievement } from '../types/mathvibe';

export const INITIAL_STUDENTS: StudentProfile[] = [
  {
    id: 'sofia-1',
    name: 'Sofía Morales',
    nickname: 'Sofi',
    avatar: '/src/assets/images/student_avatar_female_1794420473941.jpg',
    grade: '3° de Secundaria · Nivel Básico Avanzado',
    level: 4,
    levelTitle: 'Álgebra y Razonamiento Espacial',
    xp: 1420,
    streakDays: 7,
    currentMood: 'tranquilidad',
    paceScore: '1.25x Ritmo Óptimo',
    completedExercisesCount: 48,
    accuracyRate: 88,
  },
  {
    id: 'mateo-2',
    name: 'Mateo Rivera',
    nickname: 'Mateo',
    avatar: '/src/assets/images/student_profile_avatar_1794420461228.jpg',
    grade: '2° de Secundaria · Nivel Explorador',
    level: 3,
    levelTitle: 'Ecuaciones y Fracciones Equivalentes',
    xp: 980,
    streakDays: 4,
    currentMood: 'entusiasmo',
    paceScore: '1.10x Ritmo Continuo',
    completedExercisesCount: 32,
    accuracyRate: 82,
  },
];

export const TOPIC_PROGRESS_DATA: TopicProgress[] = [
  {
    id: 'operaciones',
    name: 'Operaciones básicas',
    progressPercent: 94,
    masteredCount: 22,
    totalCount: 24,
    iconName: 'Divide',
    color: '#2563eb', // Royal Blue
  },
  {
    id: 'fracciones',
    name: 'Fracciones',
    progressPercent: 72,
    masteredCount: 14,
    totalCount: 20,
    iconName: 'Layers',
    color: '#06b6d4', // Turquoise
  },
  {
    id: 'algebra',
    name: 'Álgebra y ecuaciones',
    progressPercent: 80,
    masteredCount: 19,
    totalCount: 24,
    iconName: 'Variable',
    color: '#8b5cf6', // Violet
  },
  {
    id: 'geometria',
    name: 'Geometría',
    progressPercent: 65,
    masteredCount: 13,
    totalCount: 20,
    iconName: 'Shapes',
    color: '#0ea5e9', // Sky Blue
  },
  {
    id: 'razonamiento',
    name: 'Razonamiento matemático',
    progressPercent: 86,
    masteredCount: 17,
    totalCount: 20,
    iconName: 'BrainCircuit',
    color: '#6366f1', // Indigo
  },
];

export const ACHIEVEMENTS_DATA: Achievement[] = [
  {
    id: 'racha-7',
    title: 'Constancia Estelar',
    description: 'Completaste 7 días seguidos respetando tu propio ritmo de aprendizaje.',
    icon: 'Flame',
    unlocked: true,
    unlockedAt: 'Ayer',
    category: 'ritmo',
  },
  {
    id: 'mente-zen',
    title: 'Autoconocimiento Emocional',
    description: 'Registraste tu estado emocional antes de 10 sesiones consecutivas.',
    icon: 'Sparkles',
    unlocked: true,
    unlockedAt: 'Hace 3 días',
    category: 'emocion',
  },
  {
    id: 'maestro-balanza',
    title: 'Equilibrio Algebraico',
    description: 'Resolviste 5 ecuaciones lineales en el simulador de balanza sin cometer errores.',
    icon: 'Scale',
    unlocked: true,
    unlockedAt: 'Esta semana',
    category: 'academico',
  },
  {
    id: 'resiliencia',
    title: 'Mente Resiliente',
    description: 'Transformaste 3 dudas en respuestas correctas usando pistas adaptativas.',
    icon: 'ShieldCheck',
    unlocked: false,
    category: 'emocion',
  },
  {
    id: 'desafio-geometrico',
    title: 'Arquitecto Pitagórico',
    description: 'Descubre los 3 catetos perfectos en el reto de geometría dinámica.',
    icon: 'Compass',
    unlocked: false,
    category: 'academico',
  },
];

export const EXERCISES_DATA: Exercise[] = [
  // ==========================================
  // 1. OPERACIONES BÁSICAS
  // ==========================================
  {
    id: 'op-1',
    title: 'Jerarquía de Operaciones Básicas',
    topic: 'Operaciones básicas',
    level: 1,
    difficulty: 'Básico',
    question: 'Calcula el valor numérico exacto de la siguiente expresión respetando la prioridad matemática:',
    instructions: 'Ingresa el número resultante en la casilla de texto.',
    formula: '15 - 3 × 4 + 8',
    type: 'numeric_input',
    inputPlaceholder: 'Escribe tu resultado numérico...',
    correctAnswer: 11,
    hints: [
      'Pista 1: Recuerda la jerarquía (PEMDAS/BODMAS): primero se resuelven las multiplicaciones antes que sumas y restas.',
      'Pista 2: Resuelve primero la multiplicación: 3 × 4 = 12.',
      'Pista 3: La expresión simplificada es: 15 - 12 + 8. Resuelve de izquierda a derecha.'
    ],
    explanation: {
      concept: 'Jerarquía de las Operaciones Matemáticas',
      steps: [
        'Paso 1: Localizamos la multiplicación prioritaria: 3 × 4 = 12.',
        'Paso 2: Sustituimos en la expresión: 15 - 12 + 8.',
        'Paso 3: Realizamos las sumas y restas de izquierda a derecha: 15 - 12 = 3.',
        'Paso 4: Sumamos el término restante: 3 + 8 = 11.'
      ],
      keyTakeaway: 'Las multiplicaciones y divisiones tienen mayor precedencia que las sumas y restas, a menos que existan paréntesis agrupadores.'
    },
    recommendedForMoods: ['frustracion', 'cansancio', 'tranquilidad']
  },
  {
    id: 'op-2',
    title: 'Problema Combinado de Presupuesto y Compra',
    topic: 'Operaciones básicas',
    level: 2,
    difficulty: 'Intermedio',
    question: 'Una estudiante compra 6 cuadernos a $4.50 cada uno y paga con un billete de $50. Si además compra una regla de $8.00, ¿cuánto dinero le queda de cambio?',
    instructions: 'Escribe el importe exacto en dólares (ejemplo: 15).',
    formula: '50 - (6 × 4.50 + 8.00)',
    type: 'numeric_input',
    inputPlaceholder: 'Cantidad de cambio en $...',
    inputUnit: '$',
    correctAnswer: 15,
    hints: [
      'Pista 1: Calcula primero el gasto total de los 6 cuadernos: 6 × 4.50.',
      'Pista 2: 6 × 4.50 = 27. Ahora suma el precio de la regla: 27 + 8 = 35.',
      'Pista 3: Resta el gasto total de $35 a los $50 con los que pagó: 50 - 35.'
    ],
    explanation: {
      concept: 'Operaciones Combinadas en Finanzas Cotidianas',
      steps: [
        'Paso 1: Multiplicamos cantidad de cuadernos por costo unitario: 6 × 4.50 = $27.00.',
        'Paso 2: Sumamos el costo de la regla para hallar el gasto total: 27 + 8 = $35.00.',
        'Paso 3: Restamos el gasto total al dinero entregado: 50 - 35 = $15.00 de cambio.'
      ],
      keyTakeaway: 'Agrupar mentalmente el gasto total entre paréntesis antes de restarlo al dinero disponible evita errores de signo.'
    },
    recommendedForMoods: ['tranquilidad', 'entusiasmo']
  },
  {
    id: 'op-3',
    title: 'Potencias y Raíces Cuadradas Exactas',
    topic: 'Operaciones básicas',
    level: 3,
    difficulty: 'Avanzado',
    question: 'Evalúa la siguiente expresión combinada con raíz cuadrada, potencia y producto:',
    instructions: 'Ingresa el resultado final calculado.',
    formula: '√64 + 3³ - 5 × 2',
    type: 'numeric_input',
    inputPlaceholder: 'Ingresa el número calculado...',
    correctAnswer: 25,
    hints: [
      'Pista 1: Resuelve primero las raíces y potencias: √64 y 3³.',
      'Pista 2: √64 = 8 (porque 8 × 8 = 64) y 3³ = 3 × 3 × 3 = 27.',
      'Pista 3: Ahora resuelve el producto: 5 × 2 = 10. Queda: 8 + 27 - 10.'
    ],
    explanation: {
      concept: 'Operaciones de Segundo Orden (Radicación y Potenciación)',
      steps: [
        'Paso 1: Extraemos la raíz: √64 = 8.',
        'Paso 2: Calculamos el cubo de 3: 3³ = 27.',
        'Paso 3: Multiplicamos el término lineal: 5 × 2 = 10.',
        'Paso 4: Realizamos las adiciones y sustracciones: 8 + 27 = 35, y 35 - 10 = 25.'
      ],
      keyTakeaway: 'El orden jerárquico es: 1° Paréntesis, 2° Potencias y Raíces, 3° Multiplicaciones y Divisiones, 4° Sumas y Restas.'
    },
    recommendedForMoods: ['entusiasmo', 'tranquilidad']
  },

  // ==========================================
  // 2. FRACCIONES
  // ==========================================
  {
    id: 'frac-1',
    title: 'Fracciones Equivalentes y Proporción Visual',
    topic: 'Fracciones',
    level: 1,
    difficulty: 'Básico',
    question: 'Selecciona las rebanadas del círculo interactivo para representar exactamente 3/4 (tres cuartos) de la unidad dividida en 8 porciones.',
    instructions: 'Haz clic sobre las rebanadas del círculo interactivo hasta iluminar la cantidad equivalente a 3/4.',
    formula: '3/4 = ? / 8',
    type: 'fraction_visualizer',
    correctAnswer: 6,
    hints: [
      'Pista 1: El círculo completo cuenta con 8 rebanadas iguales.',
      'Pista 2: Si multiplicas el numerador (3) y denominador (4) por 2, obtienes una fracción equivalente sobre 8.',
      'Pista 3: 3 × 2 = 6, por lo que requieres exactamente 6 rebanadas iluminadas de las 8.'
    ],
    explanation: {
      concept: 'Principio de Equivalencia de Fracciones',
      steps: [
        'Paso 1: Identificamos el total de partes del círculo: 8 rebanadas (denominador = 8).',
        'Paso 2: Determinamos la relación de escala: 8 ÷ 4 = 2 (el círculo tiene el doble de divisiones que los cuartos).',
        'Paso 3: Multiplicamos el numerador original por 2: 3 × 2 = 6.',
        'Paso 4: Por tanto, 3/4 equivale exactamente a 6/8 partes.'
      ],
      keyTakeaway: 'Multiplicar tanto el numerador como el denominador por el mismo número conserva el valor total de la fracción, solo cambia la granularidad de sus partes.'
    },
    recommendedForMoods: ['cansancio', 'frustracion', 'tranquilidad'],
    interactiveData: {
      totalSlices: 8,
      targetNumerator: 6,
      targetDenominator: 8,
    }
  },
  {
    id: 'frac-2',
    title: 'Suma de Fracciones con Distinto Denominador',
    topic: 'Fracciones',
    level: 2,
    difficulty: 'Intermedio',
    question: 'Al sumar 2/3 + 1/4 encontramos como común denominador el número 12. ¿Cuál es el numerador final resultante?',
    instructions: 'Escribe solo el número que corresponde al numerador sobre 12.',
    formula: '2/3 + 1/4 = ? / 12',
    type: 'numeric_input',
    inputPlaceholder: 'Numerador resultante...',
    correctAnswer: 11,
    hints: [
      'Pista 1: Convierte 2/3 a doceavos: multiplica numerador y denominador por 4: (2 × 4) / (3 × 4) = 8/12.',
      'Pista 2: Convierte 1/4 a doceavos: multiplica por 3: (1 × 3) / (4 × 3) = 3/12.',
      'Pista 3: Ahora suma los dos numeradores: 8 + 3.'
    ],
    explanation: {
      concept: 'Mínimo Común Múltiplo en Suma de Fracciones',
      steps: [
        'Paso 1: El mínimo común múltiplo de 3 y 4 es 12.',
        'Paso 2: Convertimos la primera fracción: 2/3 = 8/12.',
        'Paso 3: Convertimos la segunda fracción: 1/4 = 3/12.',
        'Paso 4: Sumamos los numeradores con denominador común: 8/12 + 3/12 = 11/12. El numerador es 11.'
      ],
      keyTakeaway: 'Para sumar fracciones con denominadores distintos, primero deben convertirse a un denominador común uniforme.'
    },
    recommendedForMoods: ['tranquilidad', 'frustracion']
  },
  {
    id: 'frac-3',
    title: 'Multiplicación y Fracción de una Cantidad',
    topic: 'Fracciones',
    level: 3,
    difficulty: 'Avanzado',
    question: 'Un recipiente contiene 60 litros de agua. Si se utilizan 3/5 de su contenido para regar un huerto, ¿cuántos litros de agua quedan todavía en el recipiente?',
    instructions: 'Selecciona la opción con los litros restantes.',
    formula: '60 × (1 - 3/5) = ? litros',
    type: 'multiple_choice',
    options: ['24 litros', '36 litros', '30 litros', '20 litros'],
    correctAnswer: '24 litros',
    hints: [
      'Pista 1: Si se gastan 3/5, significa que aún queda una fracción de 2/5 (porque 5/5 - 3/5 = 2/5).',
      'Pista 2: Alternativamente, calcula cuánto se gastó: 60 × 3/5 = (60 ÷ 5) × 3 = 12 × 3 = 36 litros gastados.',
      'Pista 3: Resta los 36 litros gastados del total inicial de 60 litros: 60 - 36.'
    ],
    explanation: {
      concept: 'Cálculo de Fracción de un Total y Complemento',
      steps: [
        'Paso 1: Calculamos 1/5 de 60 litros: 60 ÷ 5 = 12 litros.',
        'Paso 2: Cantidad utilizada (3/5): 12 × 3 = 36 litros.',
        'Paso 3: Calculamos la cantidad restante en el recipiente: 60 - 36 = 24 litros.',
        'Método directo: La fracción restante es 2/5. 2 × 12 = 24 litros.'
      ],
      keyTakeaway: 'Calcular la fracción complementaria (lo que falta para la unidad completa) simplifica problemas de consumo y porcentaje.'
    },
    recommendedForMoods: ['entusiasmo', 'tranquilidad']
  },

  // ==========================================
  // 3. ÁLGEBRA Y ECUACIONES
  // ==========================================
  {
    id: 'alg-1',
    title: 'Balanza de Ecuaciones Lineales',
    topic: 'Álgebra y ecuaciones',
    level: 1,
    difficulty: 'Básico',
    question: 'Encuentra el valor desconocido de "x" para que la balanza matemática quede en perfecto equilibrio horizontal.',
    instructions: 'Mueve el control deslizante de "x" hasta que la barra quede perfectamente nivelada.',
    formula: '2x + 4 = 10',
    type: 'interactive_balance',
    correctAnswer: 3,
    hints: [
      'Pista 1: Observa qué pasa si retiras 4 unidades de ambos lados de la balanza.',
      'Pista 2: Al restar 4 en la derecha te queda: 2x = 6.',
      'Pista 3: Divide 6 entre 2 para encontrar el peso individual de cada caja "x".'
    ],
    explanation: {
      concept: 'Propiedad de Igualdad Algebraica',
      steps: [
        'Paso 1: Restamos la constante 4 en ambos miembros: (2x + 4) - 4 = 10 - 4.',
        'Paso 2: Obtenemos 2x = 6.',
        'Paso 3: Dividimos ambos lados entre el coeficiente 2: x = 6 / 2 = 3.'
      ],
      keyTakeaway: 'Una ecuación es como una balanza: cualquier operación que realices en un lado debe aplicarse exactamente igual en el otro para mantener el equilibrio.'
    },
    recommendedForMoods: ['frustracion', 'cansancio', 'tranquilidad'],
    interactiveData: {
      leftConstant: 4,
      leftXCoefficient: 2,
      rightConstant: 10,
      minX: 1,
      maxX: 8,
      targetX: 3,
    }
  },
  {
    id: 'alg-2',
    title: 'Despeje de Ecuación Lineal Simple',
    topic: 'Álgebra y ecuaciones',
    level: 2,
    difficulty: 'Intermedio',
    question: 'Resuelve la siguiente ecuación de primer grado y encuentra el valor exacto de la incógnita x:',
    instructions: 'Escribe el valor numérico de x en la casilla.',
    formula: '3x - 7 = 14',
    type: 'numeric_input',
    inputPlaceholder: 'Valor de x...',
    correctAnswer: 7,
    hints: [
      'Pista 1: Primero aísla el término con x. Como el 7 está restando, súmalo en ambos miembros.',
      'Pista 2: 3x = 14 + 7 = 21.',
      'Pista 3: Ahora divide ambos miembros entre 3: x = 21 / 3.'
    ],
    explanation: {
      concept: 'Despeje de Incógnita mediante Operaciones Inversas',
      steps: [
        'Paso 1: Aplicamos la operación inversa de la resta: sumamos 7 a ambos lados: 3x = 14 + 7.',
        'Paso 2: Simplificamos el miembro derecho: 3x = 21.',
        'Paso 3: Aplicamos la operación inversa del producto: dividimos entre 3: x = 21 / 3.',
        'Paso 4: Solución: x = 7. Comprobación: 3(7) - 7 = 21 - 7 = 14.'
      ],
      keyTakeaway: 'Despejar una incógnita es realizar el camino inverso de las operaciones originales en el orden opuesto a la jerarquía usual.'
    },
    recommendedForMoods: ['tranquilidad', 'frustracion']
  },
  {
    id: 'alg-3',
    title: 'Sistema de Ecuaciones y Problema de Números',
    topic: 'Álgebra y ecuaciones',
    level: 3,
    difficulty: 'Avanzado',
    question: 'La suma de dos números enteros es 25 y su diferencia es 7. ¿Cuál es el valor del número mayor?',
    instructions: 'Ingresa el valor numérico del número mayor.',
    formula: 'x + y = 25  y  x - y = 7',
    type: 'numeric_input',
    inputPlaceholder: 'Número mayor...',
    correctAnswer: 16,
    hints: [
      'Pista 1: Plantea las dos ecuaciones: x + y = 25 y x - y = 7 (siendo x el número mayor).',
      'Pista 2: Suma las dos ecuaciones miembro a miembro: (x + y) + (x - y) = 25 + 7.',
      'Pista 3: Los términos y se anulan: 2x = 32. Divide entre 2 para hallar x.'
    ],
    explanation: {
      concept: 'Método de Eliminación / Reducción en Sistemas Lineales',
      steps: [
        'Paso 1: Formulamos el sistema: (1) x + y = 25 y (2) x - y = 7.',
        'Paso 2: Sumamos verticalmente ambas ecuaciones: 2x = 32.',
        'Paso 3: Despejamos el número mayor x: x = 32 ÷ 2 = 16.',
        'Paso 4: Verificamos el número menor y: 16 + y = 25 → y = 9. La diferencia es 16 - 9 = 7.'
      ],
      keyTakeaway: 'En problemas de suma y diferencia, el número mayor siempre es igual a (Suma + Diferencia) ÷ 2.'
    },
    recommendedForMoods: ['entusiasmo', 'tranquilidad']
  },

  // ==========================================
  // 4. GEOMETRÍA
  // ==========================================
  {
    id: 'geo-1',
    title: 'Cálculo de Área de un Triángulo',
    topic: 'Geometría',
    level: 1,
    difficulty: 'Básico',
    question: 'Un triángulo tiene una base que mide 8 cm y una altura perpendicular de 5 cm. ¿Cuál es su área en centímetros cuadrados?',
    instructions: 'Escribe el número resultante del área (cm²).',
    formula: 'Área = (Base × Altura) / 2',
    type: 'numeric_input',
    inputPlaceholder: 'Área en cm²...',
    inputUnit: 'cm²',
    correctAnswer: 20,
    hints: [
      'Pista 1: Aplica la fórmula clásica del área triangular: A = (b × h) / 2.',
      'Pista 2: Multiplica la base por la altura: 8 × 5 = 40.',
      'Pista 3: Divide el resultado entre 2: 40 ÷ 2.'
    ],
    explanation: {
      concept: 'Fundamento del Área Triangular como Mitad de un Paralelogramo',
      steps: [
        'Paso 1: Identificamos los datos dados: base b = 8 cm, altura h = 5 cm.',
        'Paso 2: Multiplicamos dimensiones lineales: 8 × 5 = 40 cm².',
        'Paso 3: Dividimos entre dos: 40 ÷ 2 = 20 cm².'
      ],
      keyTakeaway: 'Cualquier triángulo ocupa exactamente la mitad del área del rectángulo o paralelogramo que lo contiene con la misma base y altura.'
    },
    recommendedForMoods: ['cansancio', 'frustracion', 'tranquilidad']
  },
  {
    id: 'geo-2',
    title: 'Teorema de Pitágoras en Triángulos Rectángulos',
    topic: 'Geometría',
    level: 2,
    difficulty: 'Intermedio',
    question: 'Una escalera de pintor debe apoyarse a 4 metros de altura sobre una pared vertical. La base de la escalera se coloca a 3 metros de distancia de la pared en suelo plano. ¿Cuál debe ser la longitud total de la escalera?',
    instructions: 'Selecciona la longitud correcta de la escalera.',
    formula: 'c² = a² + b²',
    type: 'multiple_choice',
    options: ['5 metros', '7 metros', '6.2 metros', '4.5 metros'],
    correctAnswer: '5 metros',
    hints: [
      'Pista 1: La pared vertical y el suelo forman un ángulo recto de 90°.',
      'Pista 2: Aplica el Teorema de Pitágoras: a = 3, b = 4.',
      'Pista 3: Calcula 3² + 4² = 9 + 16 = 25. ¿Cuál es la raíz cuadrada de 25?'
    ],
    explanation: {
      concept: 'Teorema de Pitágoras en Triángulos Rectángulos',
      steps: [
        'Paso 1: Identificamos los catetos: a = 3m, b = 4m.',
        'Paso 2: Elevamos ambos al cuadrado: a² = 9, b² = 16.',
        'Paso 3: Sumamos los cuadrados: 9 + 16 = 25.',
        'Paso 4: Extraemos la raíz cuadrada de la hipotenusa: c = √25 = 5m.'
      ],
      keyTakeaway: 'En todo triángulo rectángulo, el cuadrado de la hipotenusa siempre es igual a la suma de los cuadrados de los catetos (el famoso triángulo sagrado 3-4-5).'
    },
    recommendedForMoods: ['tranquilidad', 'entusiasmo']
  },
  {
    id: 'geo-3',
    title: 'Perímetro y Ángulos Interiores de Polígonos',
    topic: 'Geometría',
    level: 3,
    difficulty: 'Avanzado',
    question: '¿Cuánto suma la totalidad de los ángulos interiores de un pentágono regular (polígono de 5 lados)?',
    instructions: 'Selecciona la suma total en grados sexagesimales.',
    formula: 'S = (n - 2) × 180°',
    type: 'multiple_choice',
    options: ['540°', '360°', '720°', '450°'],
    correctAnswer: '540°',
    hints: [
      'Pista 1: Recuerda la fórmula de la suma de ángulos interiores de un polígono de n lados: S = (n - 2) × 180°.',
      'Pista 2: Para un pentágono, el número de lados es n = 5.',
      'Pista 3: Sustituye: (5 - 2) × 180° = 3 × 180°.'
    ],
    explanation: {
      concept: 'Triangulación y Suma de Ángulos Interiores',
      steps: [
        'Paso 1: Desde un vértice de un pentágono se pueden trazar diagonales para dividirlo en exactamente 3 triángulos.',
        'Paso 2: Cada triángulo aporta 180° a la suma total interior.',
        'Paso 3: Multiplicamos: 3 × 180° = 540°.',
        'Paso 4: Por tanto, la suma total de ángulos interiores es 540° (cada ángulo regular mide 540° ÷ 5 = 108°).'
      ],
      keyTakeaway: 'Cualquier polígono de n lados puede triangularse internamente en (n - 2) triángulos no solapados.'
    },
    recommendedForMoods: ['entusiasmo', 'tranquilidad']
  },

  // ==========================================
  // 5. RAZONAMIENTO MATEMÁTICO
  // ==========================================
  {
    id: 'raz-1',
    title: 'Secuencia Lógica y Deducción de Patrones',
    topic: 'Razonamiento matemático',
    level: 1,
    difficulty: 'Básico',
    question: 'Analiza la siguiente serie matemática y determina qué número continúa la sucesión adaptativa: 2, 6, 12, 20, 30, ... ¿Qué número sigue?',
    instructions: 'Selecciona el número que continúa la serie.',
    formula: 'n × (n + 1)',
    type: 'multiple_choice',
    options: ['42', '40', '38', '44'],
    correctAnswer: '42',
    hints: [
      'Pista 1: Calcula la diferencia entre términos consecutivos: 6 - 2 = 4, 12 - 6 = 6, 20 - 12 = 8, 30 - 20 = 10...',
      'Pista 2: Las diferencias forman la serie de números pares crecientes: +4, +6, +8, +10...',
      'Pista 3: ¿Qué diferencia corresponde sumar después de +10? Corresponde sumar +12 a 30.'
    ],
    explanation: {
      concept: 'Progresión de Segundo Orden (Números Oblongos)',
      steps: [
        'Paso 1: Observamos los incrementos: de 2 a 6 (+4), de 6 a 12 (+6), de 12 a 20 (+8), de 20 a 30 (+10).',
        'Paso 2: La siguiente diferencia debe ser +12.',
        'Paso 3: 30 + 12 = 42.',
        'Método alternativo: Cada término es n × (n + 1). Para n = 6: 6 × 7 = 42.'
      ],
      keyTakeaway: 'Cuando las diferencias entre términos no son constantes, busca el patrón en las diferencias de segundo nivel para predecir el comportamiento.'
    },
    recommendedForMoods: ['frustracion', 'cansancio', 'tranquilidad']
  },
  {
    id: 'raz-2',
    title: 'Acertijo Lógico de Edades en el Tiempo',
    topic: 'Razonamiento matemático',
    level: 2,
    difficulty: 'Intermedio',
    question: 'Un padre tiene actualmente 36 años y su hijo tiene 8 años. ¿Dentro de cuántos años la edad del padre será exactamente el triple de la edad de su hijo?',
    instructions: 'Escribe el número de años que deben transcurrir.',
    formula: '36 + x = 3(8 + x)',
    type: 'numeric_input',
    inputPlaceholder: 'Número de años...',
    correctAnswer: 6,
    hints: [
      'Pista 1: Si pasan "x" años, el padre tendrá (36 + x) y el hijo tendrá (8 + x).',
      'Pista 2: Plantea la ecuación: 36 + x = 3 × (8 + x) = 24 + 3x.',
      'Pista 3: Resta x a ambos lados: 36 = 24 + 2x → 36 - 24 = 2x → 12 = 2x.'
    ],
    explanation: {
      concept: 'Modelación Algebraica de Relaciones Temporales',
      steps: [
        'Paso 1: Definimos x como los años que deben transcurrir.',
        'Paso 2: Ecuación: 36 + x = 3(8 + x).',
        'Paso 3: Expandimos el paréntesis: 36 + x = 24 + 3x.',
        'Paso 4: Despejamos: 36 - 24 = 3x - x → 12 = 2x → x = 6 años.',
        'Comprobación: En 6 años, el padre tendrá 42 y el hijo tendrá 14. 14 × 3 = 42.'
      ],
      keyTakeaway: 'El tiempo transcurre exactamente igual para todas las personas: siempre se suma la misma incógnita x a cada edad.'
    },
    recommendedForMoods: ['tranquilidad', 'entusiasmo']
  },
  {
    id: 'raz-3',
    title: 'Reto Vibe: Combinatoria y Conexiones',
    topic: 'Razonamiento matemático',
    level: 3,
    difficulty: 'Reto Vibe',
    question: 'En una sala de estudio hay 8 estudiantes. Al finalizar la sesión, cada estudiante se despide de todos los demás con un apretón de manos exactamente una vez. ¿Cuántos apretones de manos se dieron en total?',
    instructions: 'Escribe el número total de apretones de manos.',
    formula: 'C(n, 2) = n × (n - 1) / 2',
    type: 'numeric_input',
    inputPlaceholder: 'Total de apretones...',
    correctAnswer: 28,
    hints: [
      'Pista 1: Cada una de las 8 personas da la mano a las otras 7 personas: 8 × 7 = 56.',
      'Pista 2: ¡Cuidado con contar dos veces! Cuando la persona A saluda a B, es el mismo apretón que cuando B saluda a A.',
      'Pista 3: Por lo tanto, debes dividir el total entre 2: 56 ÷ 2.'
    ],
    explanation: {
      concept: 'Combinaciones sin Repetición (Grafos Completos)',
      steps: [
        'Paso 1: Cada estudiante saluda a (8 - 1) = 7 compañeros.',
        'Paso 2: Multiplicamos: 8 estudiantes × 7 saludos = 56 saludos individuales.',
        'Paso 3: Cada apretón de manos involucra a 2 personas simultáneamente.',
        'Paso 4: Dividimos entre 2 para no duplicar: 56 ÷ 2 = 28 apretones en total.'
      ],
      keyTakeaway: 'En problemas de relaciones bidireccionales no dirigidas, la fórmula de pares únicos siempre es n(n - 1) / 2.'
    },
    recommendedForMoods: ['entusiasmo']
  }
];
