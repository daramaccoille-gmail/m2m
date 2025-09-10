import React, { useState } from 'react';
import { Calendar, Users, MapPin, Target, CheckCircle, Clock, Bike, Heart, Map } from 'lucide-react';

const CyclingFundraisingPlanner = () => {
  const [activeTab, setActiveTab] = useState('training');
  const [eventDate, setEventDate] = useState('2026-07-01');
  const [fundraisingTarget, setFundraisingTarget] = useState<number>(10000);
  const [currentFunds, setCurrentFunds] = useState<number>(0);
  const [completedTasks, setCompletedTasks] = useState<Record<number, boolean>>({});

  // Calculate weeks until event
  const weeksUntilEvent = Math.max(1, Math.ceil((new Date(eventDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24 * 7)));

  // Training schedule - progressive build-up
  const generateTrainingSchedule = (): { week: number; weekendMiles: number; weekdayMiles: number; totalWeekMiles: number; focus: string; }[] => {
    const weeks = Math.min(20, weeksUntilEvent); // Cap at 20 weeks for realistic progression
    const schedule: { week: number; weekendMiles: number; weekdayMiles: number; totalWeekMiles: number; focus: string; }[] = [];
    
    for (let week = 1; week <= weeks; week++) {
      let weekendMiles, weekdayMiles;
      
      if (week <= 4) {
        // Weeks 1-4: Base building
        weekendMiles = Math.min(15 + (week * 5), 35);
        weekdayMiles = Math.min(10 + (week * 2), 20);
      } else if (week <= 12) {
        // Weeks 5-12: Progressive increase
        weekendMiles = Math.min(35 + ((week - 4) * 7), 85);
        weekdayMiles = Math.min(20 + ((week - 4) * 3), 40);
      } else if (week <= weeks - 2) {
        // Peak training phase
        weekendMiles = Math.min(85 + ((week - 12) * 3), 100);
        weekdayMiles = Math.min(40 + ((week - 12) * 2), 50);
      } else {
        // Taper weeks
        weekendMiles = Math.max(60 - ((weeks - week) * 10), 40);
        weekdayMiles = Math.max(30 - ((weeks - week) * 5), 20);
      }

      schedule.push({ 
        week: week,
        weekendMiles: Math.round(weekendMiles),
        weekdayMiles: Math.round(weekdayMiles),
        totalWeekMiles: Math.round(weekendMiles + (weekdayMiles * 2)),
        focus: week <= 4 ? 'Base Building' : week <= 12 ? 'Progressive Build' : week <= weeks - 2 ? 'Peak Training' : 'Taper'
      });
    }
    return schedule;
  };

  // Project tasks with timeline
  const projectTasks = [
    {
      id: 1,
      task: 'Route Planning & Permits',
      category: 'Planning',
      weeksBeforeEvent: 16,
      duration: 2,
      details: ['Map out exact 400-mile route', 'Check road closures', 'Contact local councils for permits', 'Identify rest stops every 25 miles']
    },
    {
      id: 2,
      task: 'Accommodation Booking',
      category: 'Logistics',
      weeksBeforeEvent: 14,
      duration: 1,
      details: ['Book hotels/B&Bs for 3 nights', 'Confirm group rates', 'Check bike storage facilities', 'Book rooms near route']
    },
    {
      id: 3,
      task: 'Transport Arrangements',
      category: 'Logistics',
      weeksBeforeEvent: 12,
      duration: 2,
      details: ['Hire 2 support buses', 'Recruit 2 qualified drivers', 'Arrange bike trailers', 'Plan return transport from Malin Head']
    },
    {
      id: 4,
      task: 'Fundraising Launch',
      category: 'Fundraising',
      weeksBeforeEvent: 16,
      duration: 14,
      details: ['Set up donation platforms', 'Create social media accounts', 'Design fundraising materials', 'Launch publicity campaign']
    },
    {
      id: 5,
      task: 'Cyclist Registration',
      category: 'Team',
      weeksBeforeEvent: 14,
      duration: 4,
      details: ['Finalize 14 cyclists', 'Collect medical forms', 'Size cyclists for jerseys', 'Create WhatsApp group']
    },
    {
      id: 6,
      task: 'Safety & Medical Planning',
      category: 'Safety',
      weeksBeforeEvent: 8,
      duration: 2,
      details: ['Arrange first aid cover', 'Create emergency contact lists', 'Plan medical supplies', 'Brief cyclists on safety protocols']
    },
    {
      id: 7,
      task: 'Nutrition & Hydration',
      category: 'Logistics',
      weeksBeforeEvent: 6,
      duration: 1,
      details: ['Order energy bars/gels', 'Arrange water supply', 'Plan meal stops', 'Calculate daily calorie needs (5000+ per cyclist)']
    },
    {
      id: 8,
      task: 'Equipment Check',
      category: 'Equipment',
      weeksBeforeEvent: 4,
      duration: 1,
      details: ['Bike mechanical checks', 'Spare parts inventory', 'Tool kit preparation', 'Emergency repair supplies']
    },
    {
      id: 9,
      task: 'Final Preparations',
      category: 'Final',
      weeksBeforeEvent: 1,
      duration: 1,
      details: ['Weather monitoring', 'Final headcount', 'Load support vehicles', 'Team briefing']
    }
  ];

  const toggleTask = (taskId: number) => {
    setCompletedTasks(prev => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
  };

  const routeData = [
    {
      day: 1,
      title: "Day 1: Mizen Head to Charleville",
      mapUrl: "https://cycle.travel/map/embed/858719",
    },
    {
      day: 2,
      title: "Day 2: Charleville to Oranmore",
      mapUrl: "https://cycle.travel/map/embed/858730",
    },
    {
      day: 3,
      title: "Day 3: Oranmore to Ballyshannon",
      mapUrl: "https://cycle.travel/map/embed/858731",
    },
    {
      day: 4,
      title: "Day 4: Ballyshannon to Malin Head",
      mapUrl: "https://cycle.travel/map/embed/858734",
    },
  ];
  const trainingSchedule = generateTrainingSchedule();
  const progressPercentage = Math.min(100, (currentFunds / fundraisingTarget) * 100);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-green-50 to-blue-50 min-h-screen">
      {/* Header */}
      <div className="text-center mb-8 bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-center gap-2 mb-4">
          <MapPin className="text-green-600" size={32} />
          <h1 className="text-3xl font-bold text-gray-800">Mizen Head to Malin Head</h1>
          <Heart className="text-red-500" size={32} />
        </div>
        <p className="text-lg text-gray-600 mb-2">400-Mile Charity Cycle for Palestine Children & Irish Language Centre</p>
        <div className="flex justify-center gap-6 text-sm text-gray-500">
          <span className="flex items-center gap-1"><Users size={16} />14 Cyclists</span>
          <span className="flex items-center gap-1"><Clock size={16} />4 Days</span>
          <span className="flex items-center gap-1"><Bike size={16} />100 miles/day</span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex justify-center mb-6">
        <div className="bg-white rounded-lg p-1 shadow-lg">
          {['training', 'fundraising', 'timeline', 'route'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-md font-medium transition-all ${
                activeTab === tab 
                  ? 'bg-blue-500 text-white shadow-md' 
                  : 'text-gray-600 hover:text-blue-500'
              }`}
            >
              {tab === 'training' && <><Bike className="inline mr-2" size={16} />Training</>}
              {tab === 'fundraising' && <><Target className="inline mr-2" size={16} />Fundraising</>}
              {tab === 'timeline' && <><Calendar className="inline mr-2" size={16} />Project Timeline</>}
              {tab === 'route' && <><Map className="inline mr-2" size={16} />Route</>}
            </button>
          ))}
        </div>
      </div>

      {/* Training Schedule Tab */}
      {activeTab === 'training' && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Bike className="text-blue-500" />
            {weeksUntilEvent}-Week Training Schedule
          </h2>
          
          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2">Training Philosophy</h3>
            <p className="text-blue-700 text-sm">
              Progressive build from current 10-15 mile ability to 100 miles/day endurance. 
              Weekend rides are structured group sessions, but midweek miles can be completed individually.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-3 text-left">Week</th>
                  <th className="border p-3 text-left">Weekend Ride</th>
                  <th className="border p-3 text-left">Midweek (2x)</th>
                  <th className="border p-3 text-left">Total/Week</th>
                  <th className="border p-3 text-left">Focus</th>
                </tr>
              </thead>
              <tbody>
                {trainingSchedule.map(week => (
                  <tr key={week.week} className={week.week <= 4 ? 'bg-green-50' : week.focus === 'Progressive Build' ? 'bg-yellow-50' : week.focus === 'Peak Training' ? 'bg-orange-50' : 'bg-blue-50'}>
                    <td className="border p-3 font-semibold">Week {week.week}</td>
                    <td className="border p-3">{week.weekendMiles} miles</td>
                    <td className="border p-3">{week.weekdayMiles} miles each</td>
                    <td className="border p-3 font-semibold">{week.totalWeekMiles} miles</td>
                    <td className="border p-3 text-sm">{week.focus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 p-4 bg-amber-50 rounded-lg">
            <h3 className="font-semibold text-amber-800 mb-2">Training Notes</h3>
            <ul className="text-amber-700 text-sm space-y-1">
              <li>• Include one rest day per week minimum</li>
              <li>• Practice nutrition strategies during long rides</li>
              <li>• Focus on maintaining 15mph average during peak weeks</li>
              <li>• Back-to-back weekend rides in final 4 weeks to simulate event conditions</li>
            </ul>
          </div>
        </div>
      )}

      {/* Fundraising Tab */}
      {activeTab === 'fundraising' && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Target className="text-green-500" />
            Fundraising Tracker
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Fundraising Target (€)</label>
              <input
                type="number"
                value={fundraisingTarget}
                onChange={(e) => setFundraisingTarget(Number(e.target.value))}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Current Team Total Raised (€)</label>
              <input
                type="number"
                value={currentFunds}
                onChange={(e) => setCurrentFunds(Number(e.target.value))}
                className="w-full p-2 border rounded-lg"
              />
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Progress: €{currentFunds.toLocaleString()}</span>
              <span>Target: €{fundraisingTarget.toLocaleString()}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-6">
              <div 
                className="bg-gradient-to-r from-green-500 to-blue-500 h-6 rounded-full flex items-center justify-end pr-2"
                style={{ width: `${Math.min(100, progressPercentage)}%` }}
              >
                <span className="text-white text-xs font-medium">{progressPercentage.toFixed(1)}%</span>
              </div>
            </div>
          </div>

          {/* Fundraising Strategy */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-3">Suggested Targets per Cyclist</h3>
              <div className="space-y-2 text-green-700">
                <div>Personal target: €{Math.round(fundraisingTarget / 14).toLocaleString()}</div>
                <div>Family & friends: €{Math.round(fundraisingTarget / 14 * 0.4).toLocaleString()}</div>
                <div>Workplace sponsorship: €{Math.round(fundraisingTarget / 14 * 0.3).toLocaleString()}</div>
                <div>Community events: €{Math.round(fundraisingTarget / 14 * 0.3).toLocaleString()}</div>
              </div>
            </div>
            
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-3">Fundraising Ideas</h3>
              <ul className="text-blue-700 text-sm space-y-1">
                <li>• Corporate sponsorship packages</li>
                <li>• Local business partnerships</li>
                <li>• Pre-event quiz nights</li>
                <li>• Social media campaigns</li>
                <li>• Sponsored training milestones</li>
                <li>• Community presentations</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Timeline Tab */}
      {activeTab === 'timeline' && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Calendar className="text-purple-500" />
            Project Timeline & Tasks
          </h2>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Event Date</label>
            <input
              type="date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              className="p-2 border rounded-lg"
            />
            <p className="text-sm text-gray-500 mt-1">
              {weeksUntilEvent} weeks until event
            </p>
          </div>

          <div className="space-y-4">
            {projectTasks
              .sort((a, b) => b.weeksBeforeEvent - a.weeksBeforeEvent)
              .map(task => {
                const startWeek = task.weeksBeforeEvent;
                const endWeek = task.weeksBeforeEvent - task.duration + 1;
                const isOverdue = startWeek > weeksUntilEvent;
                const isCurrent = weeksUntilEvent >= endWeek && weeksUntilEvent <= startWeek;
                const isCompleted = completedTasks[task.id];

                return (
                  <div 
                    key={task.id}
                    className={`border rounded-lg p-4 ${
                      isCompleted ? 'bg-green-50 border-green-200' :
                      isOverdue ? 'bg-red-50 border-red-200' :
                      isCurrent ? 'bg-yellow-50 border-yellow-200' :
                      'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <button
                            onClick={() => toggleTask(task.id)}
                            className={`p-1 rounded ${
                              isCompleted ? 'text-green-600' : 'text-gray-400 hover:text-green-600'
                            }`}
                          >
                            <CheckCircle size={20} />
                          </button>
                          <h3 className={`font-semibold ${isCompleted ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                            {task.task}
                          </h3>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            task.category === 'Planning' ? 'bg-purple-100 text-purple-800' :
                            task.category === 'Logistics' ? 'bg-blue-100 text-blue-800' :
                            task.category === 'Fundraising' ? 'bg-green-100 text-green-800' :
                            task.category === 'Safety' ? 'bg-red-100 text-red-800' :
                            task.category === 'Equipment' ? 'bg-orange-100 text-orange-800' :
                            task.category === 'Team' ? 'bg-indigo-100 text-indigo-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {task.category}
                          </span>
                        </div>
                        
                        <div className="text-sm text-gray-600 mb-2">
                          <span className={`font-medium ${isOverdue ? 'text-red-600' : isCurrent ? 'text-yellow-600' : 'text-gray-600'}`}>
                            Weeks {endWeek}-{startWeek} before event
                            {isOverdue && ' (OVERDUE)'}
                            {isCurrent && ' (CURRENT)'}
                          </span>
                        </div>

                        <ul className="text-sm text-gray-700 ml-4">
                          {task.details.map((detail, index) => (
                            <li key={index} className="mb-1">• {detail}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-2">Task Summary</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>Total Tasks: {projectTasks.length}</div>
              <div className="text-green-600">Completed: {Object.values(completedTasks).filter(Boolean).length}</div>
              <div className="text-yellow-600">Current: {projectTasks.filter(task => weeksUntilEvent >= (task.weeksBeforeEvent - task.duration + 1) && weeksUntilEvent <= task.weeksBeforeEvent).length}</div>
              <div className="text-red-600">Overdue: {projectTasks.filter(task => task.weeksBeforeEvent > weeksUntilEvent).length}</div>
            </div>
          </div>
        </div>
      )}

      {/* Route Tab */}
      {activeTab === 'route' && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Map className="text-green-600" />
            Route Maps
          </h2>
          <p className="text-gray-600 mb-8">
          The 400-mile route is broken down into four daily stages. Stay in <a href="https://goleenharbour.ie" className="text-blue-600 underline hover:text-blue-800">goleen glamping night before</a>. Here are the maps for each day.
            </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">            
            {routeData.map((route) => (
              <div key={route.day} className="border rounded-lg p-4 shadow-sm">
                <h3 className="text-lg font-semibold mb-2">{route.title}</h3>
                <iframe
                  src={route.mapUrl}
                  width="100%"
                  height="500"
                  frameBorder="0"
                  scrolling="no"
                  title={route.title}
                  className="rounded-md"
                ></iframe>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CyclingFundraisingPlanner;