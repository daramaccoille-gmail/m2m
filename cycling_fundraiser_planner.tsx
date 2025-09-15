import React, { useState } from 'react';
import { Calendar, Users, MapPin, Target, CheckCircle, Clock, Bike, Heart, Map, MessageCircle } from 'lucide-react';

import { FlagIcon } from "react-flag-kit";
export const PSFlag = () => <FlagIcon code="PS" size={48} />;
export const IEFlag = () => <FlagIcon code="IE" size={48} />;
const CyclingFundraisingPlanner = () => {
  const [activeTab, setActiveTab] = useState('cyclists');
  const [eventDate, setEventDate] = useState('2026-07-01');
  const [fundraisingTarget, setFundraisingTarget] = useState<number>(10000);
  const [completedTasks, setCompletedTasks] = useState<Record<number, boolean>>({});
  const [whatsappMessage, setWhatsappMessage] = useState('');

  interface Cyclist {
    id: number;
    name: string;
    number: number;
    stravaUrl: string;
    imageUrl: string;
    fundraisingTotal: number;
  }

  const initialCyclistsData: Cyclist[] = [
    { id: 1, name: 'Dara Mac Coille', number: 1, stravaUrl: 'https://www.strava.com/athletes/3393133', imageUrl: 'https://dgalywyr863hv.cloudfront.net/pictures/athletes/3393133/1677833/3/large.jpg', fundraisingTotal: 0 },
    { id: 2, name: 'Anthony McCloy', number: 2, stravaUrl: 'https://www.strava.com/athletes/81057994', imageUrl: 'https://dgalywyr863hv.cloudfront.net/pictures/athletes/81057994/20759063/2/large.jpg', fundraisingTotal: 0 },
    { id: 3, name: 'cyclist 3', number: 3, stravaUrl: 'https://www.strava.com/athletes/3393132', imageUrl: 'https://placehold.co/100x100/EBF4FF/767676?text=JS', fundraisingTotal: 0 },
    { id: 4, name: 'cyclist 4', number: 4, stravaUrl: 'https://www.strava.com/athletes/3393132', imageUrl: 'https://placehold.co/100x100/EBF4FF/767676?text=EW', fundraisingTotal: 0 },
    { id: 5, name: 'cyclist 5', number: 5, stravaUrl: 'https://www.strava.com/athletes/3393131', imageUrl: 'https://dgalywyr863hv.cloudfront.net/pictures/athletes/3393133/1677833/3/large.jpg', fundraisingTotal: 0 },
    { id: 6, name: 'cyclist 6', number: 6, stravaUrl: 'https://www.strava.com/athletes/3393131', imageUrl: 'https://placehold.co/100x100/EBF4FF/767676?text=JD', fundraisingTotal: 0 },
    { id: 7, name: 'cyclist 7', number: 3, stravaUrl: 'https://www.strava.com/athletes/3393131', imageUrl: 'https://placehold.co/100x100/EBF4FF/767676?text=JS', fundraisingTotal: 0 },
    { id: 8, name: 'cyclist 8', number: 4, stravaUrl: 'https://www.strava.com/athletes/3393131', imageUrl: 'https://placehold.co/100x100/EBF4FF/767676?text=EW', fundraisingTotal: 0 },
    { id: 9, name: 'cyclist 9', number: 9, stravaUrl: 'https://www.strava.com/athletes/3393133', imageUrl: 'https://dgalywyr863hv.cloudfront.net/pictures/athletes/3393133/1677833/3/large.jpg', fundraisingTotal: 0 },
    { id: 10, name: 'cyclist 10', number: 2, stravaUrl: 'https://www.strava.com/athletes/3393132', imageUrl: 'https://placehold.co/100x100/EBF4FF/767676?text=JD', fundraisingTotal: 0 },
    { id: 11, name: 'cyclist 11', number: 3, stravaUrl: 'https://www.strava.com/athletes/3393132', imageUrl: 'https://placehold.co/100x100/EBF4FF/767676?text=JS', fundraisingTotal: 0 },
    { id: 12, name: 'cyclist 12', number: 4, stravaUrl: 'https://www.strava.com/athletes/3393132', imageUrl: 'https://placehold.co/100x100/EBF4FF/767676?text=EW', fundraisingTotal: 0 },
    { id: 13, name: 'cyclist 13', number: 13, stravaUrl: 'https://www.strava.com/athletes/3393133', imageUrl: 'https://dgalywyr863hv.cloudfront.net/pictures/athletes/3393133/1677833/3/large.jpg', fundraisingTotal: 0 },
    { id: 14, name: 'cyclist 14', number: 2, stravaUrl: 'https://www.strava.com/athletes/3393132', imageUrl: 'https://placehold.co/100x100/EBF4FF/767676?text=JD', fundraisingTotal: 0 },
    { id: 15, name: 'Driver 1', number: 3, stravaUrl: 'https://www.strava.com/athletes/3393132', imageUrl: 'https://placehold.co/100x100/EBF4FF/767676?text=JS', fundraisingTotal: 0 },
    { id: 16, name: 'Driver 2', number: 4, stravaUrl: 'https://www.strava.com/athletes/3393132', imageUrl: 'https://placehold.co/100x100/EBF4FF/767676?text=EW', fundraisingTotal: 0 },
  ];

  const [cyclists, setCyclists] = useState<Cyclist[]>(initialCyclistsData);

  // Calculate total funds from individual cyclist totals
  const currentFunds = cyclists.reduce((total, cyclist) => total + cyclist.fundraisingTotal, 0);

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

  const handleCyclistFundraisingChange = (id: number, amount: number) => {
    const newAmount = Math.max(0, amount); // Prevent negative numbers
    setCyclists(prevCyclists =>
      prevCyclists.map(cyclist =>
        cyclist.id === id ? { ...cyclist, fundraisingTotal: newAmount } : cyclist
      )
    );
  };

  const routeData = [
    {
      day: 1,
      title: "Day 1: Goleen - Mizen Head - Charleville Park Hotel, Cork",
      mapUrl: "https://cycle.travel/map/embed/858719",
    },
    {
      day: 2,
      title: "Day 2: Charleville to Oranmore Maldron, Galway",
      mapUrl: "https://cycle.travel/map/embed/858730",
    },
    {
      day: 3,
      title: "Day 3: Oranmore to Dorrian's Hotel, Ballyshannon",
      mapUrl: "https://cycle.travel/map/embed/858731",
    },
    {
      day: 4,
      title: "Day 4: Ballyshannon to Malin Head, bus home",
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
       <h1 className="text-3xl font-bold text-gray-800 flex items-center justify-center gap-x-4">
          <IEFlag/>
          <span>400-Mile Charity Cycle for Palestine Children & Irish Language Centre</span>
          <PSFlag />
        </h1>
        <div className="gfm-embed" data-url="https://gofund.me/9ee74dd9c"></div><script defer src="https://www.gofundme.com/static/js/embed.js"></script>
        <div className="mt-6 mb-4 text-center">
          <a
            href="https://gofund.me/9ee74dd9c" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-green-600 hover:bg-green-700 transition-transform transform hover:scale-105 shadow-lg"
          >
            <Heart className="w-5 h-5 mr-3 -ml-1" />
            Donate on GoFundMe
          </a>
        </div>  <p className="text-lg text-gray-600 mb-2">Bus leaves Glengormley Fri 3rd July 2026 11am</p>
          <p className="text-lg text-gray-600 mb-2">Bus arives Goleen, Co. Cork, Glamping</p>
          <p className="text-lg text-gray-600 mb-2">Cycle Goleen - Mizen - Charleville Park Hotel, Cork Sat 4th July 110 miles</p>
          <p className="text-lg text-gray-600 mb-2">Cycle Charleville - Oranmore Maldron hotel, Galway Sun 5th July 90 miles</p>
         <p className="text-lg text-gray-600 mb-2">Cycle Oranmore - Dorrian's Imperial Hotel Ballyshannon, Donegal, Mon 6th July 100 miles</p>
           <p className="text-lg text-gray-600 mb-2">Ballyshannon - Mizen Head Tue7th July 100 miles</p>
           <p className="text-lg text-gray-600 mb-2">Bus leaves MIzen 3pm back Glengormley 6pm</p>
        <div className="flex justify-center gap-6 text-sm text-gray-500">
          <span className="flex items-center gap-1"><Users size={16} />14 Cyclists</span>
          <span className="flex items-center gap-1"><Clock size={16} />4 Days Cycling</span>
          <span className="flex items-center gap-1"><Bike size={16} />100 miles/day</span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex justify-center mb-6">
        <div className="bg-white rounded-lg p-1 shadow-lg">
          {['cyclists', 'training', 'fundraising', 'timeline', 'route', 'message'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-md font-medium transition-all ${
                activeTab === tab 
                  ? 'bg-blue-500 text-white shadow-md' 
                  : 'text-gray-600 hover:text-blue-500'
              }`}
            > 
              {tab === 'cyclists' && <><Users className="inline mr-2" size={16} />Cyclists</>}
              {tab === 'training' && <><Bike className="inline mr-2" size={16} />Training</>}
              {tab === 'fundraising' && <><Target className="inline mr-2" size={16} />Fundraising</>}
              {tab === 'timeline' && <><Calendar className="inline mr-2" size={16} />Project Timeline</>}
              {tab === 'route' && <><Map className="inline mr-2" size={16} />Route</>}
              {tab === 'message' && <><MessageCircle className="inline mr-2" size={16} />Message Us</>}
            </button>
          ))}
        </div>
      </div>

      {/* Cyclists Tab */}
      {activeTab === 'cyclists' && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Users className="text-indigo-500" />
            Meet the Team
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Photo</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Number</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Strava</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fundraising (€)</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {cyclists.map((cyclist) => (
                  <tr key={cyclist.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <img className="h-12 w-12 rounded-full" src={cyclist.imageUrl} alt={cyclist.name} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{cyclist.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">{cyclist.number}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <a href={cyclist.stravaUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">
                        Profile
                      </a>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input type="number" value={cyclist.fundraisingTotal} onChange={(e) => handleCyclistFundraisingChange(cyclist.id, Number(e.target.value))} className="w-32 p-2 border rounded-lg" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

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
              <div className="w-full p-2.5 border rounded-lg bg-gray-100 text-gray-700">
                €{currentFunds.toLocaleString()}</div>
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

      {/* Message Us Tab */}
      {activeTab === 'message' && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <MessageCircle className="text-teal-500" />
            Send a Message via WhatsApp
          </h2>
          <p className="text-gray-600 mb-6">
            Have a question or want to get in touch? Send a message directly to the organizer's WhatsApp.
          </p>
          <div className="space-y-4">
            <div>
              <label htmlFor="whatsapp-message" className="block text-sm font-medium text-gray-700 mb-2">
                Your Message
              </label>
              <textarea
                id="whatsapp-message"
                rows={5}
                className="w-full p-2 border rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500"
                placeholder="Type your message here..."
                value={whatsappMessage}
                onChange={(e) => setWhatsappMessage(e.target.value)}
              ></textarea>
            </div>
            <button
              onClick={() => {
                const phoneNumber = '447835005719'
                const encodedMessage = encodeURIComponent(whatsappMessage);
                const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
                window.open(url, '_blank');
              }}
              className="inline-flex items-center justify-center px-6 py-2 border border-transparent text-base font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 transition-transform transform hover:scale-105 shadow-lg"
            >
              Send on WhatsApp
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CyclingFundraisingPlanner;