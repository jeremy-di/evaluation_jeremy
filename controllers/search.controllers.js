module.exports.searchLesson = async (req, res, next) => {
    module.exports.searchLessonByTitle = async (req, res, next) => {
        try {
            const { title } = req.params; // Récupérer le titre depuis les paramètres de l'URL
    
            // Effectuer une recherche insensible à la casse et partielle
            const lessons = await Lesson.find({ title: new RegExp(title, 'i') });
    
            if (!lessons.length) {
                return res.jsonError(`No lessons found with the title: ${title}`, 404);
            }
    
            return res.jsonSuccess(lessons, 200);
        } catch (error) {
            next(error); // Passer l'erreur au middleware global de gestion des erreurs
        }
    };
}