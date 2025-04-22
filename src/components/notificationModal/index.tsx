import { useEffect, useState } from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import * as Notifications from 'expo-notifications';
import { useThemeMode } from '@/hooks/useThemeMode';
import { colors } from '@/styles/theme';

export function NotificationModal() {
  const [visible, setVisible] = useState(true);
  const { theme } = useThemeMode();

  useEffect(() => {
    async function checkPermission() {
      const { status } = await Notifications.getPermissionsAsync();
      if (status !== 'granted') {
        setVisible(true);
      }
    }

    checkPermission();
  }, []);

  async function handleRequestPermission() {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status === 'granted') {
      console.log('✅ Permissão de notificação concedida');
    } else {
      console.log('🚫 Permissão de notificação negada');
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={{
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <View style={{
          backgroundColor: theme.background,
          padding: 24,
          borderRadius: 12,
          width: '85%',
        }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: theme.text, marginBottom: 10 }}>
            Ativar notificações?
          </Text>
          <Text style={{ fontSize: 14, color: theme.text, marginBottom: 20 }}>
            Receba lembretes das suas tarefas diariamente às 9h.
          </Text>
          <View style={{flexDirection:'row', justifyContent:'space-between', width:'100%'}}>
            <TouchableOpacity onPress={handleRequestPermission} style={{
                backgroundColor: theme.green?.[600] || '#22C55E',
                padding: 12,
                borderRadius: 12,
                alignItems: 'center',
                width:120
            }}>
                <Text style={{ color: '#fff', fontWeight: 'bold' }}>Ativar agora</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setVisible(false)} style={{
                backgroundColor: colors.red[600],
                padding: 12,
                borderRadius: 12,
                alignItems: 'center',
                width:120
            }}>
                <Text style={{ color: '#fff', fontWeight: 'bold' }}>Não ativar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}