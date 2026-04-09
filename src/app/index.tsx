import { useRouter } from "expo-router";
import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
} from "react-native";
import { BlurView } from "expo-blur";
import { SafeAreaView } from "react-native-safe-area-context";
import {Background} from "@/src/components/background";
import { Image } from "react-native";

const { width } = Dimensions.get("window");

const SplashScreen: React.FC = () => {
  const router = useRouter();

  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/_sitemap");
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.root}>

      {/* Background */}
      <Background/>
      <SafeAreaView style={styles.container}>


        {/* Center Content */}
        <View style={styles.centerContainer}>
          <View style={styles.circleWrapper}>
            <BlurView intensity={20} tint="light" style={styles.circle}>
              <Image
                source={require("@/assets/images/Background+Border+Shadow+OverlayBlur.png")}
                style={styles.logoImage}
                resizeMode="contain"
              />
            </BlurView>
          </View>
        </View>

        {/* Bottom Loader */}
        <View style={styles.bottomContainer}>
          <Animated.View
            style={[
              styles.loaderCircle,
              {
                transform: [{ rotate }],
              },
            ]}
          >
            {[...Array(6)].map((_, i) => {
              const angle = (i * 360) / 6;
              const radius = 14;

              const x = radius * Math.cos((angle * Math.PI) / 180);
              const y = radius * Math.sin((angle * Math.PI) / 180);

              return (
                <View
                  key={i}
                  style={[
                    styles.circleDot,
                    {
                      position: "absolute",
                      left: 20 + x,
                      top: 20 + y,
                      opacity: (i + 1) / 6,
                    },
                  ]}
                />
              );
            })}
          </Animated.View>

          <Text style={styles.loadingText}>
            Preparing your dashboard...
          </Text>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default SplashScreen;


const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
  },

  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  circleWrapper: {
    borderRadius: 999,
    overflow: "hidden",
  },

  circle: {
    width: width * 0.7,
    height: width * 0.7,
    borderRadius: width * 0.35,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden", // 🔥 VERY IMPORTANT
  },

  bottomContainer: {
    alignItems: "center",
    paddingBottom: 40,
  },

  loaderCircle: {
    width: 40,
    height: 40,
    marginBottom: 10,
  },

  circleDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#FFD54F",
  },

  loadingText: {
    color: "#CFCFE6",
    fontSize: 12,
  },

  logoImage: {
  width: "100%",
  height: "100%",
  borderRadius: width * 0.35, // match circle
},
});