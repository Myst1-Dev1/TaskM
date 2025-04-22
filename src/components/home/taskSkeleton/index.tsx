import { View, Text, FlatList } from 'react-native';
import { MotiView } from 'moti';

import { s } from './styles';
import { TasksType } from '@/@types/tasks';
import { useThemeMode } from '@/hooks/useThemeMode';

interface TaskSkeletonProps {
    data: TasksType[] | any;
}

export function TaskSkeleton({ data }:TaskSkeletonProps) {
  const { theme } = useThemeMode();

    return (
      <FlatList
        data={data}
        keyExtractor={(_, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
        renderItem={() => (
          <View style={[s.container, {backgroundColor:theme.skeleton.container}]}>
            <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>

              <MotiView
                style={[s.skeleton, s.checkSkeleton, { backgroundColor:theme.skeleton.skeleton }]}
                from={{ opacity: 0.3 }}
                animate={{ opacity: 1 }}
                transition={{ loop: true, duration: 1000 }}
              />

              <MotiView
                style={[s.skeleton, s.titleSkeleton, { backgroundColor:theme.skeleton.skeleton }]}
                from={{ opacity: 0.3 }}
                animate={{ opacity: 1 }}
                transition={{ loop: true, duration: 1000 }}
              />
            </View>
  
            <MotiView
              style={[s.skeleton, s.descriptionSkeleton, { backgroundColor:theme.skeleton.skeleton }]}
              from={{ opacity: 0.3 }}
              animate={{ opacity: 1 }}
              transition={{ loop: true, duration: 1000 }}
            />
  
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <MotiView
                style={[s.skeleton, s.typeSkeleton , { backgroundColor:theme.skeleton.skeleton }]}
                from={{ opacity: 0.3 }}
                animate={{ opacity: 1 }}
                transition={{ loop: true, duration: 1000 }}
              />
              <MotiView
                style={[s.skeleton, s.dateSkeleton, { backgroundColor:theme.skeleton.skeleton }]}
                from={{ opacity: 0.3 }}
                animate={{ opacity: 1 }}
                transition={{ loop: true, duration: 1000 }}
              />
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', marginTop: 40, color: '#aaa' }}>
            Nenhuma tarefa encontrada.
          </Text>
        }
      />
    );
}