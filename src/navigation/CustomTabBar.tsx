import { View } from 'react-native'
import React from 'react'
import { PlatformPressable } from '@react-navigation/elements';
import { useLinkBuilder } from '@react-navigation/native';
import { BottomTabNavigationEventMap } from '@react-navigation/bottom-tabs';
import { NavigationHelpers, ParamListBase, TabNavigationState } from '@react-navigation/native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import { TAB_CONFIG } from './tabs.config'

const CustomTabBar = ({state, descriptors, navigation}: {state: TabNavigationState<ParamListBase>, descriptors: Record<string, any>, navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>}) => {
  const { buildHref } = useLinkBuilder();
  const { theme } = useUnistyles();

  return (
    <View style={styles.tabBarContainer}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };
const { icon: Icon, focusedIcon: FocusedIcon } = TAB_CONFIG[route.name as keyof typeof TAB_CONFIG] || {};
const IconComponent = isFocused ? FocusedIcon ?? Icon : Icon;
        return (
          <PlatformPressable
            key={route.key}
            href={buildHref(route.name, route.params)}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
          >
               {IconComponent && (
                 <IconComponent 
                  width={24}
                  height={35}
                  color={isFocused ? theme.colors.primary : theme.colors.grey.lighter}
                />
                )}
                { isFocused && <View style={styles.tabIndicator(isFocused)}/>

                }
          </PlatformPressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create((theme)=>({
    tabBarContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: theme.colors.surface.white,
        height: 99,
        paddingHorizontal: 55,
        paddingVertical: 24,
    },
    tabIndicator: (isFocused) => ({
      position: 'absolute',
      bottom: 10,
      left: 0,
      right: 0,
      height: 5,
      backgroundColor: isFocused ? theme.colors.primary : 'transparent',
      borderRadius: 18,
    }),

}))

export default CustomTabBar