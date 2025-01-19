import React from 'react';
import { Button } from "@/components/ui/button";

export const Header = ({ activeTab, onTabChange }) => (
  <div className="flex justify-center space-x-4 mt-4">
    <Button
      variant={activeTab === 'terminales' ? 'default' : 'outline'}
      onClick={() => onTabChange('terminales')}
    >
      Terminales
    </Button>
    <Button
      variant={activeTab === 'autobuses' ? 'default' : 'outline'}
      onClick={() => onTabChange('autobuses')}
    >
      Autobuses
    </Button>
    <Button
      variant={activeTab === 'conductores' ? 'default' : 'outline'}
      onClick={() => onTabChange('conductores')}
    >
      Conductores
    </Button>

    <Button
      variant={activeTab === 'viajes' ? 'default' : 'outline'}
      onClick={() => onTabChange('viajes')}
    >
      Viajes
    </Button>
    
    <Button
      variant={activeTab === 'Usuarios' ? 'default' : 'outline'}
      onClick={() => onTabChange('Usuarios')}
    >
      Usuarios
    </Button>

    <Button
      variant={activeTab === 'boletos' ? 'default' : 'outline'}
      onClick={() => onTabChange('boletos')}
    >
      Boletos
    </Button>
    
  </div>
);