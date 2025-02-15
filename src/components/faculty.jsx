import React, { useState } from 'react';
// eslint-disable-next-line
import { useAuth } from '../contexts/AuthContext';
// eslint-disable-next-line
import { useNavigate } from 'react-router-dom';

const Faculty = () => {
  // eslint-disable-next-line
  const { currentUser } = useAuth();
  // eslint-disable-next-line
  const navigate = useNavigate();

  // Paper Template Configuration state
  const [paperConfig, setPaperConfig] = useState({
    branchName: '',
    year: '',
    subjectName: '',
    examName: '',
    class: '',
    subject: ''
  });

  // Section Configuration state
  const [sectionConfig, setSectionConfig] = useState({
    questions: '',
    instructions: '',
    marksSchema: 'marks-schema-1',
    totalQuestions: ''
  });

  // Questions state
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({
    questionText: '',
    moduleNumber: '',
    difficulty: 'easy',
    marks: 1
  });

  // Removed unused chapters state and related functions
  const [selectedChapter, setSelectedChapter] = useState('');

  // Handle Paper Template Configuration changes
  const handlePaperConfigChange = (e) => {
    setPaperConfig({
      ...paperConfig,
      [e.target.name]: e.target.value
    });
  };

  // Handle Section Configuration changes
  const handleSectionConfigChange = (e) => {
    setSectionConfig({
      ...sectionConfig,
      [e.target.name]: e.target.value
    });
  };

  // Handle Question input changes
  const handleQuestionChange = (e) => {
    setCurrentQuestion({
      ...currentQuestion,
      [e.target.name]: e.target.value
    });
  };

  // Add new question to the list
  const handleAddQuestion = () => {
    if (currentQuestion.questionText.trim()) {
      setQuestions([...questions, { ...currentQuestion, chapter: selectedChapter }]);
      setCurrentQuestion({
        questionText: '',
        moduleNumber: '',
        difficulty: 'easy',
        marks: 1
      });
    }
  };

  // Handle template save
  const handleSaveTemplate = async () => {
    try {
      console.log('Saving template:', paperConfig);
      // Add your API call here
    } catch (error) {
      console.error('Error saving template:', error);
    }
  };

  // Handle section save
  const handleSaveSection = async () => {
    try {
      console.log('Saving section:', sectionConfig);
      // Add your API call here
    } catch (error) {
      console.error('Error saving section:', error);
    }
  };

  // Handle question save
  const handleSaveQuestion = async () => {
    try {
      console.log('Saving questions:', questions);
      // Add your API call here
    } catch (error) {
      console.error('Error saving questions:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">Create Question Bank</h2>
          
          {/* Paper Template Configuration */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Paper Template Configuration</h3>
            <div className="space-y-4">
              <input
                type="text"
                name="branchName"
                placeholder="Branch Name"
                value={paperConfig.branchName}
                onChange={handlePaperConfigChange}
                className="w-full p-2 border rounded"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="year"
                  placeholder="Year"
                  value={paperConfig.year}
                  onChange={handlePaperConfigChange}
                  className="p-2 border rounded"
                />
                <input
                  type="text"
                  name="subjectName"
                  placeholder="Subject Name"
                  value={paperConfig.subjectName}
                  onChange={handlePaperConfigChange}
                  className="p-2 border rounded"
                />
              </div>
              <input
                type="text"
                name="examName"
                placeholder="Exam Name"
                value={paperConfig.examName}
                onChange={handlePaperConfigChange}
                className="w-full p-2 border rounded"
              />
              <button
                onClick={handleSaveTemplate}
                className="w-full bg-navy-blue text-white p-2 rounded hover:bg-blue-700"
              >
                Save Template
              </button>
            </div>
          </div>

          {/* Section Configuration */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Section Configuration</h3>
            <div className="space-y-4">
              <input
                type="text"
                name="questions"
                placeholder="Questions"
                value={sectionConfig.questions}
                onChange={handleSectionConfigChange}
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                name="instructions"
                placeholder="Instructions"
                value={sectionConfig.instructions}
                onChange={handleSectionConfigChange}
                className="w-full p-2 border rounded"
              />
              <select
                name="marksSchema"
                value={sectionConfig.marksSchema}
                onChange={handleSectionConfigChange}
                className="w-full p-2 border rounded"
              >
                <option value="marks-schema-1">Marks schema 1</option>
                <option value="marks-schema-2">Marks schema 2</option>
              </select>
              <button
                onClick={handleSaveSection}
                className="w-full bg-navy-blue text-white p-2 rounded hover:bg-blue-700"
              >
                Save Section
              </button>
            </div>
          </div>

          {/* Add Questions */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Add Questions</h3>
            <div className="space-y-4">
              <textarea
                name="questionText"
                placeholder="Enter question text"
                value={currentQuestion.questionText}
                onChange={handleQuestionChange}
                className="w-full p-2 border rounded"
                rows="4"
              />
              <div className="grid grid-cols-2 gap-4">
                <select
                  name="difficulty"
                  value={currentQuestion.difficulty}
                  onChange={handleQuestionChange}
                  className="p-2 border rounded"
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
                <input
                  type="number"
                  name="marks"
                  placeholder="Marks"
                  value={currentQuestion.marks}
                  onChange={handleQuestionChange}
                  className="p-2 border rounded"
                  min="1"
                />
              </div>
              <button
                onClick={handleAddQuestion}
                className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
              >
                Add Question
              </button>
              <button
                onClick={handleSaveQuestion}
                className="w-full bg-navy-blue text-white p-2 rounded hover:bg-blue-700"
              >
                Save Question
              </button>
            </div>
          </div>

          {/* Display Added Questions */}
          {questions.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Added Questions</h3>
              <div className="space-y-4">
                {questions.map((q, index) => (
                  <div key={index} className="p-4 border rounded">
                    <p className="font-medium">Question {index + 1}</p>
                    <p>{q.questionText}</p>
                    <div className="mt-2 text-sm text-gray-600">
                      <span className="mr-4">Difficulty: {q.difficulty}</span>
                      <span>Marks: {q.marks}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Faculty;