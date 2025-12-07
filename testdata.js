// --- DATA FOR NON-MATH TESTS ---
const testsData = {
    iq: {
        title: 'IQ Тест',
        questions: [
            { q: 'Яке число логічно зайве в ряду: 2,4,8,16,31?', a: ['31','16','8','4'], correct: '31' },
            { q: 'Завершіть послідовність: 1,1,2,3,5,8,?', a: ['13','11','10','12'], correct: '13' },
            { q: 'Якщо К=11, L=12, то що означає слово CAT (C=3,A=1,T=20 → сума)?', a: ['24','10','28','26'], correct: '24' },
            { q: 'Що зайве: коло, квадрат, трикутник, сфера?', a: ['сфера','коло','квадрат','трикутник'], correct: 'сфера' },
            { q: 'У Марка 5 яблук, він віддав 2. Скільки залишилось?', a: ['3','5','2','1'], correct: '3' },
            { q: 'Оберіть продовження ряду: A, C, E, G, ?', a: ['I','H','J','F'], correct: 'I' },
            { q: 'Яке число пропущено: 3,6,12,24,?', a: ['48','36','30','46'], correct: '48' },
            { q: 'Скільки кутів у п\'ятикутника?', a: ['5','4','6','3'], correct: '5' },
            { q: 'Яке слово зайве: кіт, собака, ведмідь, троянда?', a: ['троянда','кіт','собака','ведмідь'], correct: 'троянда' },
            { q: 'Якщо всі троянди — квіти, а деякі квіти — білі, то:', a: ['Деякі троянди можуть бути білими','Троянди точно білі','Білі — не квіти','Нічого з цього'], correct: 'Деякі троянди можуть бути білими' }
        ]
    },

    english: {
        title: 'Тест англійської',
        questions: [
            { q: 'Choose the correct word: She _____ to school yesterday.', a: ['go','went','gone','goes'], correct: 'went' },
            { q: 'Translate "книга".', a: ['book','pen','table','chair'], correct: 'book' },
            { q: 'Which is a synonym of "big"?', a: ['large','tiny','cold','fast'], correct: 'large' },
            { q: 'Choose the correct article: ___ apple.', a: ['a','an','the','no article'], correct: 'an' },
            { q: 'Choose the correct form: They _____ now.', a: ['are playing','played','plays','will play'], correct: 'are playing' },
            { q: 'Past form of "run"?', a: ['ran','runned','run','runs'], correct: 'ran' },
            { q: 'What is the antonym of "hot"?', a: ['cold','warm','big','long'], correct: 'cold' },
            { q: 'Choose the correct sentence.', a: ['He have a car','He has a car','He having car','He are car'], correct: 'He has a car' },
            { q: 'Fill the gap: I want ___ tea.', a: ['some','a','any','the'], correct: 'some' },
            { q: 'Translate "I am learning English".', a: ['Я вивчаю англійську','Я вивчив англійську','Я буду вивчати англійську','Я не вивчаю англійську'], correct: 'Я вивчаю англійську' }
        ]
    },

    minecraft: {
        title: 'Тест про Майнкрафт',
        questions: [
            { q: 'Який блок використовують для виплавки?', a: ['Furnace','Crafting Table','Anvil','Chest'], correct: 'Furnace' },
            { q: 'Яка істота світиться вночі та вибухає поруч із гравцем?', a: ['Creeper','Zombie','Skeleton','Enderman'], correct: 'Creeper' },
            { q: 'Що потрібно для дерев\'яної лопати?', a: ['Stick + Planks','Stone + Stick','Iron + Stick','Dirt'], correct: 'Stick + Planks' },
            { q: 'Як називається вимір з драконом?', a: ['The End','Nether','Overworld','Deep Dark'], correct: 'The End' },
            { q: 'Що випадає з корови при вбивстві?', a: ['Raw Beef','Feather','Bone','Gunpowder'], correct: 'Raw Beef' },
            { q: 'Ким можна торгувати з жителями?', a: ['Emerald','Diamond','Gold','Iron'], correct: 'Emerald' },
            { q: 'Який інструмент найкраще для добування каменю?', a: ['Pickaxe','Shovel','Sword','Hoe'], correct: 'Pickaxe' },
            { q: 'Як приручити вовка?', a: ['Кісткою','Золотом','Рибою','Сілом'], correct: 'Кісткою' },
            { q: 'Який моб не горить на сонці?', a: ['Creeper','Zombie','Skeleton','Spider'], correct: 'Creeper' },
            { q: 'Що потрібно для порталу в Незер?', a: ['Obsidian + Flint and Steel','Sand + Torch','Wood + Lava','Cobblestone + Stick'], correct: 'Obsidian + Flint and Steel' }
        ]
    }
}
export default testsData;
