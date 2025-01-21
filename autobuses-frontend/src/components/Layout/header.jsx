import React from 'react';
import { Button } from "@/components/ui/button";
import { Building2, Bus, UserRound, Route, UserRoundPlus, Ticket } from 'lucide-react';

export const Header = ({ activeTab, onTabChange }) => (
  <div className="flex flex-wrap justify-center gap-2 p-4 mx-auto max-w-screen-xl">
    <Button
      variant={activeTab === 'terminales' ? 'default' : 'outline'}
      onClick={() => onTabChange('terminales')}
      className="flex items-center gap-2"
    >
      <Building2 className="w-4 h-4" />
      <span>Terminales</span>
    </Button>
    
    <Button
      variant={activeTab === 'autobuses' ? 'default' : 'outline'}
      onClick={() => onTabChange('autobuses')}
      className="flex items-center gap-2"
    >
      <Bus className="w-4 h-4" />
      <span>Autobuses</span>
    </Button>
    
    <Button
      variant={activeTab === 'conductores' ? 'default' : 'outline'}
      onClick={() => onTabChange('conductores')}
      className="flex items-center gap-2"
    >
      <UserRound className="w-4 h-4" />
      <span>Conductores</span>
    </Button>

    <Button
      variant={activeTab === 'viajes' ? 'default' : 'outline'}
      onClick={() => onTabChange('viajes')}
      className="flex items-center gap-2"
    >
      <Route className="w-4 h-4" />
      <span>Viajes</span>
    </Button>
    
    <Button
      variant={activeTab === 'Usuarios' ? 'default' : 'outline'}
      onClick={() => onTabChange('Usuarios')}
      className="flex items-center gap-2"
    >
      <UserRoundPlus className="w-4 h-4" />
      <span>Usuarios</span>
    </Button>

    <Button
      variant={activeTab === 'boletos' ? 'default' : 'outline'}
      onClick={() => onTabChange('boletos')}
      className="flex items-center gap-2"
    >
      <Ticket className="w-4 h-4" />
      <span>Boletos</span>
    </Button>
  </div>
);

