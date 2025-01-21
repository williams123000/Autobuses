import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Header } from './components/Layout/header';
import { TerminalPage } from './components/Terminal/terminalPage';
import { BusPage } from './components/Bus/busPage';
import { DriverPage } from './components/Driver/driverPage';
import { JourneyPage } from './components/Journey/journeyPage';
import { TicketPage } from './components/Ticket/ticketPage';
import { UserPage } from './components/User/userPage';

const App = () => {
  const [activeTab, setActiveTab] = useState('terminales');

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <Card className="max-w-6xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center mb-3">
          🌎 Sistema de Gestión de Viajes en Autobús 🚍
          </CardTitle>
          <Header activeTab={activeTab} onTabChange={setActiveTab} />
        </CardHeader>
        <CardContent>
          {activeTab === 'terminales' && <TerminalPage />}
          {activeTab === 'autobuses' && <BusPage />}
          {activeTab === 'conductores' && <DriverPage />}
          {activeTab === 'viajes' && <JourneyPage />}
          {activeTab === 'Usuarios' && <UserPage />}
          {activeTab === 'boletos' && <TicketPage />}
        </CardContent>
      </Card>
    </div>
  );
};

export default App;