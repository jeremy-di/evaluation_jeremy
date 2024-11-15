const lessonsContainer = document.querySelector('.cards_container');

const fetchLessons = async () => {
    const response = await fetch('http://localhost:8000/api/v1/lesson/all')
    const {data} = await response.json()
    createLessonsCards(data)
}

fetchLessons()

const createLessonsCards = (lessons) => {
    const lessonsList = lessons.map(lesson => {
        const lessonCard = document.createElement('div')
        lessonCard.classList.add('max-w-sm', 'p-6', 'bg-white', 'border', 'border-gray-200', 'rounded-lg', 'shadow', 'dark:bg-gray-800', 'dark:border-gray-700')
        lessonCard.innerHTML = `
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${lesson.title}</h5>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Nombre de chapitres : <span>${lesson.chaptersNumber}</span></p>
            <button type="button" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Voir</button>
            <button type="button" class="bouton-rouge focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" data-id=${lesson._id}>Supprimer</button>
        `
        return lessonCard
    })
    lessonsContainer.innerHTML = ''
    lessonsContainer.append(...lessonsList)

    const deleteButtons = lessonsContainer.querySelectorAll('.bouton-rouge');
    deleteButtons.forEach(button => {
        button.addEventListener('click', async (event) => {
            const lessonId = event.target.dataset.id;

            // Confirmation de suppression
            const confirmDelete = confirm('Êtes-vous sûr de vouloir supprimer cette leçon ?');
            if (!confirmDelete) return;

            try {
                const response = await fetch(`http://localhost:8000/api/v1/lesson/${lessonId}`, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    throw new Error('Erreur lors de la suppression de la leçon');
                }

                alert('Leçon supprimée avec succès');
                fetchLessons();
            } catch (error) {
                alert('Une erreur est survenue lors de la suppression de la leçon');
            }
        });
    });
}

const form = document.querySelector('form');
const errorsContainer = document.querySelector('.errors');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const lesson = Object.fromEntries(formData.entries());

    if (!isValidForm(lesson)) {
        return;
    }

    try {
        const response = await fetch("http://localhost:8000/api/v1/lesson/new", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(lesson),
        });

        if (!response.ok) throw new Error('Failed to create the lesson');

        alert('Lesson created successfully!');
        window.location.assign('/public');
    } catch (error) {
        console.error('Error creating lesson:', error);
        displayErrors(['An error occurred while creating the lesson.']);
    }
});

const isValidForm = (lesson) => {
    const errors = [];

    if (!lesson.title || lesson.title.trim().length < 3) {
        errors.push('Le titre doit faire au moins 5 caractères');
    }

    if (errors.length > 0) {
        displayErrors(errors);
        return false;
    }

    displayErrors([]);
    return true;
};

const displayErrors = (errors) => {
    if (!errorsContainer) return;

    errorsContainer.innerHTML = errors.map((err) => `<p>${err}</p>`).join('');
};

