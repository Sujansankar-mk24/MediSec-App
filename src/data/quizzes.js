export const hipaaQuiz = {
  id: "hipaa-essentials-01",
  title: "HIPAA & Patient Privacy Essentials",
  category: "general",
  difficulty: "medium",
  time_limit_minutes: 10,
  passing_score: 80,
  questions: [
    {
      question_id: "q1",
      question_text: "Which of the following is considered Protected Health Information (PHI)?",
      options: [
        "A patient's favorite color mentioned in a survey",
        "A prescription bottle with a patient's name and medication",
        "An anonymous statistic about hospital wait times",
        "A public list of hospital department phone numbers"
      ],
      correct_answer: 1,
      explanation: "PHI includes any information that can identify a patient and relates to their health condition or treatment.",
      points: 20
    },
    {
      question_id: "q2",
      question_text: "You notice a colleague left their workstation unlocked with a patient record open. What is the correct action?",
      options: [
        "Quickly close the record yourself and say nothing",
        "Ignore it; it's the colleague's responsibility",
        "Notify the colleague and ensure the station is locked immediately",
        "Post a reminder about security on the office bulletin board"
      ],
      correct_answer: 2,
      explanation: "The 'Minimum Necessary' rule and security protocols require immediate action to secure exposed PHI.",
      points: 20
    }
  ]
};