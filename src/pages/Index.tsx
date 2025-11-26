import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

type GameState = 'menu' | 'lobby' | 'game';
type Player = {
  id: number;
  name: string;
  status: 'ready' | 'notReady' | 'dead' | 'reviving';
};

const Index = () => {
  const [gameState, setGameState] = useState<GameState>('menu');
  const [players, setPlayers] = useState<Player[]>([
    { id: 1, name: 'GHOST-77', status: 'ready' },
    { id: 2, name: 'NEON-42', status: 'ready' },
    { id: 3, name: 'CYBER-99', status: 'notReady' },
    { id: 4, name: '', status: 'notReady' },
  ]);
  const [playersAlive, setPlayersAlive] = useState(3);
  const [zone, setZone] = useState(100);

  const handleRevive = (playerId: number) => {
    setPlayers(players.map(p => 
      p.id === playerId ? { ...p, status: 'reviving' as const } : p
    ));
    setTimeout(() => {
      setPlayers(players.map(p => 
        p.id === playerId ? { ...p, status: 'ready' as const } : p
      ));
      setPlayersAlive(prev => prev + 1);
    }, 3000);
  };

  if (gameState === 'menu') {
    return (
      <div className="min-h-screen bg-background cyber-grid relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-secondary/10 pointer-events-none" />
        <div className="absolute top-0 left-0 w-full h-1 bg-primary animate-scan opacity-30" />
        
        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
          <h1 className="text-7xl md:text-9xl font-black text-primary neon-glow mb-4 animate-pulse-neon">
            CYBER BR
          </h1>
          <p className="text-xl md:text-2xl text-secondary mb-16 font-bold tracking-wider">
            BATTLE ROYALE 2077
          </p>

          <div className="space-y-4 w-full max-w-md">
            <Button 
              onClick={() => setGameState('lobby')}
              className="w-full h-16 text-xl font-bold bg-primary hover:bg-primary/80 text-primary-foreground neon-border transition-all duration-300"
            >
              <Icon name="Users" className="mr-3" size={28} />
              SQUAD MODE
            </Button>

            <Button 
              className="w-full h-16 text-xl font-bold bg-secondary hover:bg-secondary/80 text-secondary-foreground neon-border transition-all duration-300"
            >
              <Icon name="User" className="mr-3" size={28} />
              SOLO MODE
            </Button>

            <Button 
              className="w-full h-16 text-xl font-bold bg-muted hover:bg-muted/80 text-muted-foreground neon-border transition-all duration-300"
            >
              <Icon name="Settings" className="mr-3" size={28} />
              SETTINGS
            </Button>
          </div>

          <div className="mt-16 flex gap-8 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Icon name="Globe" size={20} />
              <span>EN SERVER</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="Wifi" size={20} />
              <span className="text-accent">32ms</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'lobby') {
    return (
      <div className="min-h-screen bg-background cyber-grid relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none" />
        
        <div className="relative z-10 p-6 min-h-screen">
          <div className="flex justify-between items-center mb-8">
            <Button 
              onClick={() => setGameState('menu')}
              variant="ghost" 
              className="text-primary hover:text-primary/80"
            >
              <Icon name="ArrowLeft" className="mr-2" />
              BACK
            </Button>
            <h2 className="text-3xl font-bold text-primary neon-glow">SQUAD LOBBY</h2>
            <div className="w-24" />
          </div>

          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-foreground mb-4 flex items-center">
                <Icon name="Users" className="mr-2" />
                YOUR SQUAD (4/4)
              </h3>
              <div className="space-y-3">
                {players.map((player) => (
                  <Card key={player.id} className="p-4 bg-card border-primary/50 neon-border">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded bg-primary/20 flex items-center justify-center">
                          <Icon name="User" className="text-primary" size={24} />
                        </div>
                        <div>
                          <p className="font-bold text-foreground">
                            {player.name || `SLOT ${player.id}`}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {player.name ? 'CONNECTED' : 'WAITING...'}
                          </p>
                        </div>
                      </div>
                      <Badge 
                        className={
                          player.status === 'ready' 
                            ? 'bg-accent text-accent-foreground'
                            : 'bg-muted text-muted-foreground'
                        }
                      >
                        {player.status === 'ready' ? 'READY' : 'NOT READY'}
                      </Badge>
                    </div>
                  </Card>
                ))}
              </div>

              <Button 
                onClick={() => setGameState('game')}
                className="w-full h-14 mt-6 text-lg font-bold bg-accent hover:bg-accent/80 text-accent-foreground neon-border animate-pulse-neon"
              >
                <Icon name="Zap" className="mr-2" size={24} />
                START MATCH
              </Button>
            </div>

            <div>
              <h3 className="text-xl font-bold text-foreground mb-4 flex items-center">
                <Icon name="Map" className="mr-2" />
                MAP PREVIEW
              </h3>
              <Card className="p-6 bg-card border-primary/50 neon-border aspect-square flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10" />
                <div className="relative z-10 text-center">
                  <Icon name="MapPin" className="mx-auto mb-4 text-primary" size={64} />
                  <p className="text-lg font-bold text-foreground mb-2">NEO CITY</p>
                  <p className="text-sm text-muted-foreground">100 PLAYERS</p>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge className="bg-secondary text-secondary-foreground">FEATURED</Badge>
                </div>
              </Card>

              <div className="mt-6 space-y-3">
                <Card className="p-4 bg-card border-primary/50">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Mode:</span>
                    <span className="font-bold text-foreground">Squad (4v4v4...)</span>
                  </div>
                </Card>
                <Card className="p-4 bg-card border-primary/50">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Respawn:</span>
                    <span className="font-bold text-accent">Enabled</span>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background cyber-grid relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-destructive/20 via-transparent to-transparent pointer-events-none" />
      
      <div className="relative z-10 p-4">
        <div className="flex justify-between items-start mb-4">
          <div className="space-y-2">
            <Card className="p-3 bg-card/90 border-primary neon-border backdrop-blur">
              <div className="flex items-center gap-2 mb-2">
                <Icon name="Users" className="text-primary" size={20} />
                <span className="font-bold text-foreground">YOUR SQUAD</span>
              </div>
              <div className="space-y-1">
                {players.slice(0, 3).map((player) => (
                  <div key={player.id} className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${
                      player.status === 'ready' ? 'bg-accent animate-pulse-neon' : 
                      player.status === 'reviving' ? 'bg-secondary animate-pulse' : 
                      'bg-destructive'
                    }`} />
                    <span className="text-sm text-foreground">{player.name}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-3 bg-card/90 border-secondary neon-border backdrop-blur">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon name="Heart" className="text-destructive" size={20} />
                  <span className="font-bold text-foreground">ALIVE</span>
                </div>
                <span className="text-2xl font-bold text-accent">{playersAlive}/4</span>
              </div>
            </Card>
          </div>

          <div className="space-y-2">
            <Card className="p-3 bg-destructive/90 border-destructive neon-border backdrop-blur animate-pulse-neon">
              <div className="flex items-center gap-2 mb-1">
                <Icon name="AlertTriangle" className="text-destructive-foreground" size={20} />
                <span className="font-bold text-destructive-foreground">ZONE</span>
              </div>
              <div className="text-2xl font-bold text-destructive-foreground">{zone}%</div>
              <div className="text-xs text-destructive-foreground mt-1">SHRINKING</div>
            </Card>

            <Button 
              onClick={() => setGameState('menu')}
              variant="destructive"
              className="w-full neon-border"
            >
              <Icon name="LogOut" className="mr-2" size={16} />
              EXIT
            </Button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto mt-16">
          <Card className="p-8 bg-card/95 border-primary neon-border backdrop-blur">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-primary neon-glow mb-2">IN-GAME VIEW</h3>
              <p className="text-muted-foreground">Battle Royale in progress</p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-bold text-foreground flex items-center">
                  <Icon name="Crosshair" className="mr-2 text-primary" />
                  COMBAT STATS
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Eliminations:</span>
                    <span className="font-bold text-accent">7</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Damage:</span>
                    <span className="font-bold text-secondary">1,245</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Players Left:</span>
                    <span className="font-bold text-foreground">23/100</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-bold text-foreground flex items-center">
                  <Icon name="HeartPulse" className="mr-2 text-secondary" />
                  REVIVE SYSTEM
                </h4>
                <div className="space-y-2">
                  {players.filter(p => p.status === 'dead').map(player => (
                    <Button
                      key={player.id}
                      onClick={() => handleRevive(player.id)}
                      className="w-full bg-secondary hover:bg-secondary/80 neon-border"
                      size="sm"
                    >
                      <Icon name="Activity" className="mr-2" size={16} />
                      REVIVE {player.name}
                    </Button>
                  ))}
                  {players.every(p => p.status !== 'dead') && (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      All squad members alive
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-muted/50 rounded border border-primary/30">
              <p className="text-center text-sm text-muted-foreground">
                <Icon name="Info" className="inline mr-2" size={16} />
                Teammates can be revived within 90 seconds of elimination
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
