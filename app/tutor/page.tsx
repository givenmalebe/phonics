"use client"

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import {
  Users,
  GraduationCap,
  TrendingUp,
  Clock,
  Bell,
  LogOut,
  BarChart3,
  Calendar,
  BookOpen,
  Target,
  CheckCircle,
  User,
  MapPin,
  FileText,
  Settings,
  Edit,
  Save,
  X,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Grid3X3,
  List
} from 'lucide-react'

import { useRouter } from 'next/navigation'
import { authService } from '@/lib/auth-service'
import AITutorAgent from '@/components/ai-tutor-agent'

// Mock data based on the timetable you provided
const mockTutorData = {
  id: "tutor-1",
  firstName: "Jack",
  lastName: "Chuene",
  email: "jack.chuene@stretcheducation.edu",
  
  // Learner statistics
  learnerStats: {
    totalLearners: 45,
    grade3A: 15,
    grade3B: 12,
    grade3C: 10,
    grade3D: 8
  },
  
  // Level distribution
  levelDistribution: [
    { level: "PINK", count: 18, percentage: 40 },
    { level: "BLUE", count: 15, percentage: 33 },
    { level: "YELLOW", count: 8, percentage: 18 },
    { level: "PURPLE", count: 4, percentage: 9 }
  ],
  
  // Timetable data from your image with detailed session information
  timetable: {
    "Monday": [
      { 
        time: "08:00 - 08:30", 
        class: "3A (Watermelon Group 1)",
        sessionId: "mon-0800-3a-watermelon",
        grade: "3A",
        group: "Watermelon Group 1",
        level: "PINK",
        location: "Room 101",
        students: [
          { name: "Thabo Mthembu", progress: 85, status: "On Track" },
          { name: "Lerato Khumalo", progress: 92, status: "Excellent" },
          { name: "Sipho Ndlovu", progress: 78, status: "On Track" },
          { name: "Nomsa Dlamini", progress: 88, status: "On Track" },
          { name: "Kagiso Molefe", progress: 95, status: "Excellent" }
        ],
        lesson: {
          title: "Basic Sound Recognition",
          objectives: ["Identify single letter sounds", "Match sounds to letters", "Practice phoneme isolation"],
          materials: ["Sound cards", "Letter tiles", "Audio recordings"],
          activities: ["Sound matching game", "Letter sound practice", "Individual assessment"]
        }
      },
      { 
        time: "08:30 - 09:00", 
        class: "3A (Apple Group 2)",
        sessionId: "mon-0830-3a-apple",
        grade: "3A",
        group: "Apple Group 2",
        level: "BLUE",
        location: "Room 101",
        students: [
          { name: "Aisha Patel", progress: 90, status: "Excellent" },
          { name: "Mandla Zulu", progress: 82, status: "On Track" },
          { name: "Precious Mahlangu", progress: 87, status: "On Track" },
          { name: "Tebogo Mokoena", progress: 93, status: "Excellent" },
          { name: "Zanele Nkomo", progress: 79, status: "On Track" }
        ],
        lesson: {
          title: "Consonant Blends",
          objectives: ["Identify consonant blends", "Blend sounds together", "Read simple blend words"],
          materials: ["Blend cards", "Word building tiles", "Practice worksheets"],
          activities: ["Blend building", "Word reading practice", "Spelling assessment"]
        }
      },
      { 
        time: "09:00 - 09:30", 
        class: "3A (Orange Group 3)",
        sessionId: "mon-0900-3a-orange",
        grade: "3A",
        group: "Orange Group 3",
        level: "YELLOW",
        location: "Room 101",
        students: [
          { name: "Katlego Mabena", progress: 88, status: "On Track" },
          { name: "Refilwe Sebola", progress: 91, status: "Excellent" },
          { name: "Tshepo Maluleke", progress: 85, status: "On Track" },
          { name: "Neo Motaung", progress: 89, status: "On Track" }
        ],
        lesson: {
          title: "Multisyllabic Words",
          objectives: ["Break words into syllables", "Read longer words", "Understand syllable patterns"],
          materials: ["Syllable cards", "Clapping sticks", "Word lists"],
          activities: ["Syllable clapping", "Word building", "Reading practice"]
        }
      },
      { 
        time: "09:30 - 10:30", 
        class: "3B (Mango Group 1)",
        sessionId: "mon-0930-3b-mango",
        grade: "3B",
        group: "Mango Group 1",
        level: "PINK",
        location: "Room 102",
        students: [
          { name: "Lwazi Dube", progress: 75, status: "Needs Support" },
          { name: "Thandiwe Ngcobo", progress: 83, status: "On Track" },
          { name: "Bongani Sithole", progress: 80, status: "On Track" },
          { name: "Naledi Tau", progress: 87, status: "On Track" },
          { name: "Mpho Radebe", progress: 91, status: "Excellent" },
          { name: "Kgothatso Lekota", progress: 78, status: "On Track" }
        ],
        lesson: {
          title: "Letter-Sound Correspondence",
          objectives: ["Master basic letter sounds", "Improve sound recognition", "Build phonemic awareness"],
          materials: ["Alphabet cards", "Sound boxes", "Mirror for articulation"],
          activities: ["Sound drill", "Letter matching", "Phoneme practice"]
        }
      },
      { 
        time: "10:30 - 11:00", 
        class: "3B (Grapes Group 2)",
        sessionId: "mon-1030-3b-grapes",
        grade: "3B",
        group: "Grapes Group 2",
        level: "BLUE",
        location: "Room 102",
        students: [
          { name: "Sello Mashego", progress: 86, status: "On Track" },
          { name: "Palesa Mokone", progress: 92, status: "Excellent" },
          { name: "Tumi Phala", progress: 84, status: "On Track" },
          { name: "Dineo Mthombeni", progress: 88, status: "On Track" }
        ],
        lesson: {
          title: "Digraphs and Blends",
          objectives: ["Recognize common digraphs", "Practice blend reading", "Apply in context"],
          materials: ["Digraph cards", "Blend wheels", "Reading passages"],
          activities: ["Digraph hunt", "Blend practice", "Contextual reading"]
        }
      },
      { time: "11:00 - 11:45", class: "LUNCH", type: "break" },
      { 
        time: "12:00 - 12:30", 
        class: "3B (Peach Group 3)",
        sessionId: "mon-1200-3b-peach",
        grade: "3B",
        group: "Peach Group 3",
        level: "PURPLE",
        location: "Room 102",
        students: [
          { name: "Khanya Mthembu", progress: 94, status: "Excellent" },
          { name: "Rethabile Mosia", progress: 89, status: "On Track" },
          { name: "Lesego Moloi", progress: 96, status: "Excellent" },
          { name: "Omphile Kekana", progress: 91, status: "Excellent" }
        ],
        lesson: {
          title: "Advanced Code Knowledge",
          objectives: ["Master complex spelling patterns", "Read fluently", "Apply advanced phonics rules"],
          materials: ["Complex word cards", "Reading passages", "Spelling lists"],
          activities: ["Pattern recognition", "Fluency practice", "Advanced spelling"]
        }
      },
      { 
        time: "12:30 - 13:00", 
        class: "3C (Strawberry Group 1)",
        sessionId: "mon-1230-3c-strawberry",
        grade: "3C",
        group: "Strawberry Group 1",
        level: "PINK",
        location: "Room 103",
        students: [
          { name: "Keabetswe Molefe", progress: 82, status: "On Track" },
          { name: "Boitumelo Seane", progress: 79, status: "On Track" },
          { name: "Tlhogi Maboe", progress: 85, status: "On Track" },
          { name: "Karabo Phiri", progress: 88, status: "On Track" },
          { name: "Mmabatho Kgomo", progress: 76, status: "Needs Support" }
        ],
        lesson: {
          title: "Phoneme Awareness",
          objectives: ["Identify individual sounds", "Segment words into sounds", "Blend sounds into words"],
          materials: ["Sound counters", "Phoneme cards", "Segmentation mats"],
          activities: ["Sound counting", "Phoneme segmentation", "Blending practice"]
        }
      },
      { 
        time: "13:00 - 13:30", 
        class: "3C (Pineapple Group 2)",
        sessionId: "mon-1300-3c-pineapple",
        grade: "3C",
        group: "Pineapple Group 2",
        level: "BLUE",
        location: "Room 103",
        students: [
          { name: "Kutlwano Mogale", progress: 90, status: "Excellent" },
          { name: "Masego Lebea", progress: 87, status: "On Track" },
          { name: "Paballo Moiloa", progress: 93, status: "Excellent" },
          { name: "Kgauhelo Maimane", progress: 85, status: "On Track" }
        ],
        lesson: {
          title: "Short Vowel Patterns",
          objectives: ["Master short vowel sounds", "Read CVC words", "Spell simple words"],
          materials: ["Vowel cards", "CVC word cards", "Spelling boards"],
          activities: ["Vowel practice", "Word building", "Spelling games"]
        }
      },
      { time: "13:30 - 14:30", class: "Records of sessions", type: "admin" }
    ],
    "Tuesday": [
      { 
        time: "08:00 - 08:30", 
        class: "3C (Pear Group 3)",
        sessionId: "tue-0800-3c-pear",
        grade: "3C",
        group: "Pear Group 3",
        level: "YELLOW",
        location: "Room 103",
        students: [
          { name: "Tshepiso Mthembu", progress: 87, status: "On Track" },
          { name: "Kgotso Maleka", progress: 91, status: "Excellent" },
          { name: "Bontle Mokwena", progress: 84, status: "On Track" },
          { name: "Lebo Khumalo", progress: 89, status: "On Track" }
        ],
        lesson: {
          title: "Long Vowel Patterns",
          objectives: ["Identify long vowel sounds", "Read CVCe words", "Apply vowel rules"],
          materials: ["Long vowel cards", "CVCe word lists", "Pattern charts"],
          activities: ["Vowel pattern practice", "Word sorting", "Reading fluency"]
        }
      },
      { 
        time: "08:30 - 09:00", 
        class: "3D (Square Group 1)",
        sessionId: "tue-0830-3d-square",
        grade: "3D",
        group: "Square Group 1",
        level: "PINK",
        location: "Room 104",
        students: [
          { name: "Mpho Sekhoto", progress: 78, status: "On Track" },
          { name: "Neo Mabaso", progress: 82, status: "On Track" },
          { name: "Thato Moloi", progress: 75, status: "Needs Support" },
          { name: "Refiloe Mbeki", progress: 86, status: "On Track" },
          { name: "Kagiso Tema", progress: 80, status: "On Track" }
        ],
        lesson: {
          title: "Initial Sound Recognition",
          objectives: ["Identify beginning sounds", "Match sounds to letters", "Build sound awareness"],
          materials: ["Initial sound cards", "Picture cards", "Sound sorting mats"],
          activities: ["Sound matching", "Picture sorting", "Beginning sound games"]
        }
      },
      { 
        time: "09:00 - 09:30", 
        class: "3D (Rectangle Group 2)",
        sessionId: "tue-0900-3d-rectangle",
        grade: "3D",
        group: "Rectangle Group 2",
        level: "BLUE",
        location: "Room 104",
        students: [
          { name: "Palesa Nkomo", progress: 88, status: "On Track" },
          { name: "Sello Motaung", progress: 92, status: "Excellent" },
          { name: "Dineo Phiri", progress: 85, status: "On Track" },
          { name: "Tumelo Radebe", progress: 90, status: "Excellent" }
        ],
        lesson: {
          title: "Consonant Clusters",
          objectives: ["Read consonant clusters", "Blend complex sounds", "Apply in reading"],
          materials: ["Cluster cards", "Word wheels", "Reading passages"],
          activities: ["Cluster practice", "Word building", "Guided reading"]
        }
      },
      { 
        time: "09:30 - 10:30", 
        class: "3D (Circle Group 3)",
        sessionId: "tue-0930-3d-circle",
        grade: "3D",
        group: "Circle Group 3",
        level: "PURPLE",
        location: "Room 104",
        students: [
          { name: "Katlego Sibeko", progress: 95, status: "Excellent" },
          { name: "Lesego Mthombeni", progress: 93, status: "Excellent" },
          { name: "Boitumelo Tau", progress: 97, status: "Excellent" },
          { name: "Rethabile Dube", progress: 91, status: "Excellent" }
        ],
        lesson: {
          title: "Complex Spelling Patterns",
          objectives: ["Master difficult spellings", "Apply spelling rules", "Read complex texts"],
          materials: ["Spelling pattern cards", "Complex texts", "Rule charts"],
          activities: ["Pattern analysis", "Spelling practice", "Text reading"]
        }
      },
      { 
        time: "10:30 - 11:00", 
        class: "3E (Oval Group 1)",
        sessionId: "tue-1030-3e-oval",
        grade: "3E",
        group: "Oval Group 1",
        level: "PINK",
        location: "Room 105",
        students: [
          { name: "Mmabatho Lekota", progress: 79, status: "On Track" },
          { name: "Tebogo Mokone", progress: 83, status: "On Track" },
          { name: "Keabetswe Phala", progress: 77, status: "Needs Support" },
          { name: "Kutlwano Seane", progress: 85, status: "On Track" },
          { name: "Masego Maboe", progress: 81, status: "On Track" }
        ],
        lesson: {
          title: "Sound-Symbol Relationships",
          objectives: ["Connect sounds to symbols", "Build letter knowledge", "Develop phonics skills"],
          materials: ["Letter-sound cards", "Symbol charts", "Practice sheets"],
          activities: ["Symbol matching", "Sound practice", "Letter formation"]
        }
      },
      { time: "11:00 - 11:45", class: "LUNCH", type: "break" },
      { 
        time: "12:00 - 12:30", 
        class: "3E (Diamond Group 2)",
        sessionId: "tue-1200-3e-diamond",
        grade: "3E",
        group: "Diamond Group 2",
        level: "BLUE",
        location: "Room 105",
        students: [
          { name: "Paballo Kgomo", progress: 89, status: "On Track" },
          { name: "Kgauhelo Lebea", progress: 86, status: "On Track" },
          { name: "Tlhogi Moiloa", progress: 92, status: "Excellent" },
          { name: "Karabo Maimane", progress: 88, status: "On Track" }
        ],
        lesson: {
          title: "Word Families",
          objectives: ["Recognize word patterns", "Read word families", "Build vocabulary"],
          materials: ["Word family cards", "Pattern wheels", "Family books"],
          activities: ["Family sorting", "Pattern practice", "Reading games"]
        }
      },
      { 
        time: "12:30 - 13:00", 
        class: "3E (Triangle Group 3)",
        sessionId: "tue-1230-3e-triangle",
        grade: "3E",
        group: "Triangle Group 3",
        level: "YELLOW",
        location: "Room 105",
        students: [
          { name: "Boitumelo Mogale", progress: 90, status: "Excellent" },
          { name: "Lesego Mashego", progress: 87, status: "On Track" },
          { name: "Neo Sithole", progress: 93, status: "Excellent" },
          { name: "Thabo Ngcobo", progress: 85, status: "On Track" }
        ],
        lesson: {
          title: "Syllable Division",
          objectives: ["Divide words into syllables", "Read multisyllabic words", "Apply division rules"],
          materials: ["Syllable cards", "Division charts", "Word lists"],
          activities: ["Syllable counting", "Division practice", "Word reading"]
        }
      },
      { time: "13:00 - 13:30", class: "" },
      { time: "13:30 - 14:30", class: "Records of sessions", type: "admin" }
    ],
    "Wednesday": [
      { 
        time: "08:00 - 08:30", 
        class: "3A (Watermelon Group 1)",
        sessionId: "wed-0800-3a-watermelon",
        grade: "3A",
        group: "Watermelon Group 1",
        level: "PINK",
        location: "Room 101",
        students: [
          { name: "Thabo Mthembu", progress: 87, status: "On Track" },
          { name: "Lerato Khumalo", progress: 94, status: "Excellent" },
          { name: "Sipho Ndlovu", progress: 80, status: "On Track" },
          { name: "Nomsa Dlamini", progress: 90, status: "Excellent" },
          { name: "Kagiso Molefe", progress: 96, status: "Excellent" }
        ],
        lesson: {
          title: "Phoneme Blending Practice",
          objectives: ["Blend individual sounds", "Form complete words", "Improve reading fluency"],
          materials: ["Blending cards", "Sound strips", "Word wheels"],
          activities: ["Sound blending", "Word formation", "Fluency drills"]
        }
      },
      { 
        time: "08:30 - 09:00", 
        class: "3A (Apple Group 2)",
        sessionId: "wed-0830-3a-apple",
        grade: "3A",
        group: "Apple Group 2",
        level: "BLUE",
        location: "Room 101",
        students: [
          { name: "Aisha Patel", progress: 92, status: "Excellent" },
          { name: "Mandla Zulu", progress: 85, status: "On Track" },
          { name: "Precious Mahlangu", progress: 89, status: "On Track" },
          { name: "Tebogo Mokoena", progress: 95, status: "Excellent" },
          { name: "Zanele Nkomo", progress: 82, status: "On Track" }
        ],
        lesson: {
          title: "Digraph Recognition",
          objectives: ["Identify common digraphs", "Read digraph words", "Apply in context"],
          materials: ["Digraph charts", "Word cards", "Reading books"],
          activities: ["Digraph hunt", "Word reading", "Story reading"]
        }
      },
      { 
        time: "09:00 - 09:30", 
        class: "3A (Orange Group 3)",
        sessionId: "wed-0900-3a-orange",
        grade: "3A",
        group: "Orange Group 3",
        level: "YELLOW",
        location: "Room 101",
        students: [
          { name: "Katlego Mabena", progress: 90, status: "Excellent" },
          { name: "Refilwe Sebola", progress: 93, status: "Excellent" },
          { name: "Tshepo Maluleke", progress: 87, status: "On Track" },
          { name: "Neo Motaung", progress: 91, status: "Excellent" }
        ],
        lesson: {
          title: "Advanced Word Patterns",
          objectives: ["Recognize complex patterns", "Read challenging words", "Build vocabulary"],
          materials: ["Pattern cards", "Complex word lists", "Vocabulary books"],
          activities: ["Pattern matching", "Word analysis", "Vocabulary building"]
        }
      },
      { 
        time: "09:30 - 10:30", 
        class: "3B (Mango Group 1)",
        sessionId: "wed-0930-3b-mango",
        grade: "3B",
        group: "Mango Group 1",
        level: "PINK",
        location: "Room 102",
        students: [
          { name: "Lwazi Dube", progress: 78, status: "On Track" },
          { name: "Thandiwe Ngcobo", progress: 85, status: "On Track" },
          { name: "Bongani Sithole", progress: 82, status: "On Track" },
          { name: "Naledi Tau", progress: 89, status: "On Track" },
          { name: "Mpho Radebe", progress: 93, status: "Excellent" },
          { name: "Kgothatso Lekota", progress: 80, status: "On Track" }
        ],
        lesson: {
          title: "Phonics Review",
          objectives: ["Review basic sounds", "Strengthen weak areas", "Build confidence"],
          materials: ["Review cards", "Assessment sheets", "Practice books"],
          activities: ["Sound review", "Skill practice", "Progress check"]
        }
      },
      { 
        time: "10:30 - 11:00", 
        class: "3B (Grapes Group 2)",
        sessionId: "wed-1030-3b-grapes",
        grade: "3B",
        group: "Grapes Group 2",
        level: "BLUE",
        location: "Room 102",
        students: [
          { name: "Sello Mashego", progress: 88, status: "On Track" },
          { name: "Palesa Mokone", progress: 94, status: "Excellent" },
          { name: "Tumi Phala", progress: 86, status: "On Track" },
          { name: "Dineo Mthombeni", progress: 90, status: "Excellent" }
        ],
        lesson: {
          title: "Reading Comprehension",
          objectives: ["Understand text meaning", "Answer questions", "Make connections"],
          materials: ["Reading passages", "Question cards", "Comprehension sheets"],
          activities: ["Guided reading", "Question practice", "Discussion"]
        }
      },
      { time: "11:00 - 11:45", class: "LUNCH", type: "break" },
      { 
        time: "12:00 - 12:30", 
        class: "3B (Peach Group 3)",
        sessionId: "wed-1200-3b-peach",
        grade: "3B",
        group: "Peach Group 3",
        level: "PURPLE",
        location: "Room 102",
        students: [
          { name: "Khanya Mthembu", progress: 96, status: "Excellent" },
          { name: "Rethabile Mosia", progress: 91, status: "Excellent" },
          { name: "Lesego Moloi", progress: 98, status: "Excellent" },
          { name: "Omphile Kekana", progress: 93, status: "Excellent" }
        ],
        lesson: {
          title: "Creative Writing",
          objectives: ["Write original stories", "Use advanced vocabulary", "Express ideas clearly"],
          materials: ["Writing journals", "Story prompts", "Vocabulary lists"],
          activities: ["Story writing", "Peer sharing", "Editing practice"]
        }
      },
      { 
        time: "12:30 - 13:00", 
        class: "3C (Strawberry Group 1)",
        sessionId: "wed-1230-3c-strawberry",
        grade: "3C",
        group: "Strawberry Group 1",
        level: "PINK",
        location: "Room 103",
        students: [
          { name: "Keabetswe Molefe", progress: 84, status: "On Track" },
          { name: "Boitumelo Seane", progress: 81, status: "On Track" },
          { name: "Tlhogi Maboe", progress: 87, status: "On Track" },
          { name: "Karabo Phiri", progress: 90, status: "Excellent" },
          { name: "Mmabatho Kgomo", progress: 78, status: "On Track" }
        ],
        lesson: {
          title: "Sound Segmentation",
          objectives: ["Break words into sounds", "Count phonemes", "Improve phonemic awareness"],
          materials: ["Segmentation mats", "Sound counters", "Word lists"],
          activities: ["Sound counting", "Word breaking", "Phoneme practice"]
        }
      },
      { 
        time: "13:00 - 13:30", 
        class: "3C (Pineapple Group 2)",
        sessionId: "wed-1300-3c-pineapple",
        grade: "3C",
        group: "Pineapple Group 2",
        level: "BLUE",
        location: "Room 103",
        students: [
          { name: "Kutlwano Mogale", progress: 92, status: "Excellent" },
          { name: "Masego Lebea", progress: 89, status: "On Track" },
          { name: "Paballo Moiloa", progress: 95, status: "Excellent" },
          { name: "Kgauhelo Maimane", progress: 87, status: "On Track" }
        ],
        lesson: {
          title: "Vowel Combinations",
          objectives: ["Read vowel teams", "Apply vowel rules", "Decode complex words"],
          materials: ["Vowel team cards", "Rule charts", "Practice words"],
          activities: ["Team practice", "Rule application", "Word decoding"]
        }
      },
      { time: "13:30 - 14:30", class: "Records of Sessions", type: "admin" }
    ],
    "Thursday": [
      { 
        time: "08:00 - 08:30", 
        class: "3C (Pear Group 3)",
        sessionId: "thu-0800-3c-pear",
        grade: "3C",
        group: "Pear Group 3",
        level: "YELLOW",
        location: "Room 103",
        students: [
          { name: "Tshepiso Mthembu", progress: 89, status: "On Track" },
          { name: "Kgotso Maleka", progress: 93, status: "Excellent" },
          { name: "Bontle Mokwena", progress: 86, status: "On Track" },
          { name: "Lebo Khumalo", progress: 91, status: "Excellent" }
        ],
        lesson: {
          title: "Fluency Building",
          objectives: ["Increase reading speed", "Maintain comprehension", "Build confidence"],
          materials: ["Fluency passages", "Timers", "Progress charts"],
          activities: ["Timed reading", "Repeated reading", "Progress tracking"]
        }
      },
      { 
        time: "08:30 - 09:00", 
        class: "3D (Square Group 1)",
        sessionId: "thu-0830-3d-square",
        grade: "3D",
        group: "Square Group 1",
        level: "PINK",
        location: "Room 104",
        students: [
          { name: "Mpho Sekhoto", progress: 80, status: "On Track" },
          { name: "Neo Mabaso", progress: 84, status: "On Track" },
          { name: "Thato Moloi", progress: 77, status: "On Track" },
          { name: "Refiloe Mbeki", progress: 88, status: "On Track" },
          { name: "Kagiso Tema", progress: 82, status: "On Track" }
        ],
        lesson: {
          title: "Assessment and Review",
          objectives: ["Assess progress", "Identify gaps", "Plan next steps"],
          materials: ["Assessment sheets", "Progress charts", "Review materials"],
          activities: ["Skill assessment", "Progress review", "Goal setting"]
        }
      },
      { 
        time: "09:00 - 09:30", 
        class: "3D (Rectangle Group 2)",
        sessionId: "thu-0900-3d-rectangle",
        grade: "3D",
        group: "Rectangle Group 2",
        level: "BLUE",
        location: "Room 104",
        students: [
          { name: "Palesa Nkomo", progress: 90, status: "Excellent" },
          { name: "Sello Motaung", progress: 94, status: "Excellent" },
          { name: "Dineo Phiri", progress: 87, status: "On Track" },
          { name: "Tumelo Radebe", progress: 92, status: "Excellent" }
        ],
        lesson: {
          title: "Silent Reading Practice",
          objectives: ["Read independently", "Build stamina", "Develop comprehension"],
          materials: ["Level-appropriate books", "Reading logs", "Comprehension questions"],
          activities: ["Silent reading", "Log completion", "Discussion"]
        }
      },
      { 
        time: "09:30 - 10:30", 
        class: "3D (Circle Group 3)",
        sessionId: "thu-0930-3d-circle",
        grade: "3D",
        group: "Circle Group 3",
        level: "PURPLE",
        location: "Room 104",
        students: [
          { name: "Katlego Sibeko", progress: 97, status: "Excellent" },
          { name: "Lesego Mthombeni", progress: 95, status: "Excellent" },
          { name: "Boitumelo Tau", progress: 99, status: "Excellent" },
          { name: "Rethabile Dube", progress: 93, status: "Excellent" }
        ],
        lesson: {
          title: "Literature Analysis",
          objectives: ["Analyze texts", "Discuss themes", "Make inferences"],
          materials: ["Short stories", "Analysis sheets", "Discussion prompts"],
          activities: ["Text analysis", "Group discussion", "Critical thinking"]
        }
      },
      { 
        time: "10:30 - 11:00", 
        class: "3E (Oval Group 1)",
        sessionId: "thu-1030-3e-oval",
        grade: "3E",
        group: "Oval Group 1",
        level: "PINK",
        location: "Room 105",
        students: [
          { name: "Mmabatho Lekota", progress: 81, status: "On Track" },
          { name: "Tebogo Mokone", progress: 85, status: "On Track" },
          { name: "Keabetswe Phala", progress: 79, status: "On Track" },
          { name: "Kutlwano Seane", progress: 87, status: "On Track" },
          { name: "Masego Maboe", progress: 83, status: "On Track" }
        ],
        lesson: {
          title: "Weekly Review",
          objectives: ["Review week's learning", "Consolidate skills", "Celebrate progress"],
          materials: ["Review worksheets", "Progress charts", "Reward stickers"],
          activities: ["Skill review", "Progress celebration", "Goal setting"]
        }
      },
      { time: "11:00 - 11:45", class: "LUNCH", type: "break" },
      { 
        time: "12:00 - 12:30", 
        class: "3E (Diamond Group 2)",
        sessionId: "thu-1200-3e-diamond",
        grade: "3E",
        group: "Diamond Group 2",
        level: "BLUE",
        location: "Room 105",
        students: [
          { name: "Paballo Kgomo", progress: 91, status: "Excellent" },
          { name: "Kgauhelo Lebea", progress: 88, status: "On Track" },
          { name: "Tlhogi Moiloa", progress: 94, status: "Excellent" },
          { name: "Karabo Maimane", progress: 90, status: "Excellent" }
        ],
        lesson: {
          title: "Spelling Patterns",
          objectives: ["Learn spelling rules", "Practice patterns", "Apply in writing"],
          materials: ["Spelling lists", "Pattern charts", "Writing paper"],
          activities: ["Pattern practice", "Spelling games", "Writing application"]
        }
      },
      { 
        time: "12:30 - 13:00", 
        class: "3E (Triangle Group 3)",
        sessionId: "thu-1230-3e-triangle",
        grade: "3E",
        group: "Triangle Group 3",
        level: "YELLOW",
        location: "Room 105",
        students: [
          { name: "Boitumelo Mogale", progress: 92, status: "Excellent" },
          { name: "Lesego Mashego", progress: 89, status: "On Track" },
          { name: "Neo Sithole", progress: 95, status: "Excellent" },
          { name: "Thabo Ngcobo", progress: 87, status: "On Track" }
        ],
        lesson: {
          title: "Reading Strategy Review",
          objectives: ["Review reading strategies", "Apply techniques", "Build metacognition"],
          materials: ["Strategy cards", "Practice texts", "Reflection sheets"],
          activities: ["Strategy practice", "Text application", "Self-reflection"]
        }
      },
      { time: "13:00 - 13:30", class: "" },
      { time: "13:30 - 14:30", class: "Records of sessions", type: "admin" }
    ]
  },

  // Students list with comprehensive data
  students: [
    { id: 1, name: "Thabo", surname: "Mthembu", level: "PINK", lesson: "Basic Sound Recognition", absence: 2 },
    { id: 2, name: "Lerato", surname: "Khumalo", level: "PINK", lesson: "Basic Sound Recognition", absence: 0 },
    { id: 3, name: "Sipho", surname: "Ndlovu", level: "PINK", lesson: "Basic Sound Recognition", absence: 1 },
    { id: 4, name: "Nomsa", surname: "Dlamini", level: "PINK", lesson: "Basic Sound Recognition", absence: 0 },
    { id: 5, name: "Kagiso", surname: "Molefe", level: "PINK", lesson: "Basic Sound Recognition", absence: 1 },
    { id: 6, name: "Aisha", surname: "Patel", level: "BLUE", lesson: "Blending Consonants", absence: 0 },
    { id: 7, name: "Mandla", surname: "Zulu", level: "BLUE", lesson: "Blending Consonants", absence: 3 },
    { id: 8, name: "Precious", surname: "Mahlangu", level: "BLUE", lesson: "Blending Consonants", absence: 1 },
    { id: 9, name: "Tebogo", surname: "Mokoena", level: "BLUE", lesson: "Blending Consonants", absence: 0 },
    { id: 10, name: "Zanele", surname: "Nkomo", level: "BLUE", lesson: "Blending Consonants", absence: 2 },
    { id: 11, name: "Lethabo", surname: "Morake", level: "YELLOW", lesson: "Advanced Phonemes", absence: 1 },
    { id: 12, name: "Katlego", surname: "Mahlaba", level: "YELLOW", lesson: "Advanced Phonemes", absence: 0 },
    { id: 13, name: "Neo", surname: "Motaung", level: "YELLOW", lesson: "Advanced Phonemes", absence: 2 },
    { id: 14, name: "Palesa", surname: "Seabi", level: "YELLOW", lesson: "Advanced Phonemes", absence: 1 },
    { id: 15, name: "Kgothatso", surname: "Lekota", level: "PURPLE", lesson: "Complex Reading", absence: 0 },
    { id: 16, name: "Dineo", surname: "Mthombeni", level: "PURPLE", lesson: "Complex Reading", absence: 1 },
    { id: 17, name: "Omphile", surname: "Kekana", level: "PURPLE", lesson: "Complex Reading", absence: 0 },
    { id: 18, name: "Mmabatho", surname: "Kgomo", level: "PURPLE", lesson: "Complex Reading", absence: 3 },
    { id: 19, name: "Kgauhelo", surname: "Maimane", level: "PINK", lesson: "Basic Sound Recognition", absence: 1 },
    { id: 20, name: "Lebo", surname: "Khumalo", level: "BLUE", lesson: "Blending Consonants", absence: 0 },
    { id: 21, name: "Kagiso", surname: "Tema", level: "YELLOW", lesson: "Advanced Phonemes", absence: 2 },
    { id: 22, name: "Tumelo", surname: "Radebe", level: "BLUE", lesson: "Blending Consonants", absence: 1 },
    { id: 23, name: "Rethabile", surname: "Dube", level: "YELLOW", lesson: "Advanced Phonemes", absence: 0 },
    { id: 24, name: "Masego", surname: "Maboe", level: "PINK", lesson: "Basic Sound Recognition", absence: 1 },
    { id: 25, name: "Karabo", surname: "Maimane", level: "BLUE", lesson: "Blending Consonants", absence: 0 },
    { id: 26, name: "Thabo", surname: "Ngcobo", level: "YELLOW", lesson: "Advanced Phonemes", absence: 2 },
    { id: 27, name: "Boitumelo", surname: "Mofokeng", level: "PINK", lesson: "Basic Sound Recognition", absence: 1 },
    { id: 28, name: "Refiloe", surname: "Tau", level: "BLUE", lesson: "Blending Consonants", absence: 0 },
    { id: 29, name: "Tshepo", surname: "Makola", level: "PURPLE", lesson: "Complex Reading", absence: 1 },
    { id: 30, name: "Naledi", surname: "Mohlala", level: "YELLOW", lesson: "Advanced Phonemes", absence: 0 },
    { id: 31, name: "Mothusi", surname: "Seroke", level: "PINK", lesson: "Basic Sound Recognition", absence: 3 },
    { id: 32, name: "Keabetswe", surname: "Mogale", level: "BLUE", lesson: "Blending Consonants", absence: 1 },
    { id: 33, name: "Lebohang", surname: "Moloi", level: "YELLOW", lesson: "Advanced Phonemes", absence: 0 },
    { id: 34, name: "Mpho", surname: "Sebola", level: "PURPLE", lesson: "Complex Reading", absence: 2 },
    { id: 35, name: "Nthabiseng", surname: "Mthembu", level: "PINK", lesson: "Basic Sound Recognition", absence: 1 },
    { id: 36, name: "Paballo", surname: "Mokone", level: "BLUE", lesson: "Blending Consonants", absence: 0 },
    { id: 37, name: "Sello", surname: "Tladi", level: "YELLOW", lesson: "Advanced Phonemes", absence: 1 },
    { id: 38, name: "Thandeka", surname: "Vilakazi", level: "PINK", lesson: "Basic Sound Recognition", absence: 2 },
    { id: 39, name: "Unathi", surname: "Gumede", level: "BLUE", lesson: "Blending Consonants", absence: 0 },
    { id: 40, name: "Vuyiswa", surname: "Mthombeni", level: "YELLOW", lesson: "Advanced Phonemes", absence: 1 },
    { id: 41, name: "Wandile", surname: "Dlamini", level: "PURPLE", lesson: "Complex Reading", absence: 0 },
    { id: 42, name: "Xolani", surname: "Khumalo", level: "PINK", lesson: "Basic Sound Recognition", absence: 2 },
    { id: 43, name: "Yamkela", surname: "Ndaba", level: "BLUE", lesson: "Blending Consonants", absence: 1 },
    { id: 44, name: "Zinhle", surname: "Makhanya", level: "YELLOW", lesson: "Advanced Phonemes", absence: 0 },
    { id: 45, name: "Ayanda", surname: "Sithole", level: "PINK", lesson: "Basic Sound Recognition", absence: 1 }
  ]
}

const levelColors = {
  PINK: "bg-pink-100 text-pink-800 border-pink-200",
  BLUE: "bg-blue-100 text-blue-800 border-blue-200",
  YELLOW: "bg-yellow-100 text-yellow-800 border-yellow-200",
  PURPLE: "bg-purple-100 text-purple-800 border-purple-200"
}

const gradeColors = {
  "3A": "bg-green-100 text-green-800",
  "3B": "bg-blue-100 text-blue-800", 
  "3C": "bg-purple-100 text-purple-800",
  "3D": "bg-orange-100 text-orange-800",
  "3E": "bg-red-100 text-red-800"
}

export default function TutorDashboard() {
  const router = useRouter()
  const [tutorData, setTutorData] = useState(mockTutorData)
  const [selectedDay, setSelectedDay] = useState("Monday")
  const [selectedSession, setSelectedSession] = useState(null)
  const [isSessionModalOpen, setIsSessionModalOpen] = useState(false)
  const [editingStats, setEditingStats] = useState({})
  const [tempStats, setTempStats] = useState({})
  const [editingLevels, setEditingLevels] = useState({})
  const [tempLevels, setTempLevels] = useState({})
  const [editingTimetable, setEditingTimetable] = useState({})
  const [tempTimetable, setTempTimetable] = useState({})
  const [editingSession, setEditingSession] = useState(false)
  const [tempSession, setTempSession] = useState(null)
  const [isStartingSession, setIsStartingSession] = useState(false)
  const [sessionOnboarding, setSessionOnboarding] = useState({
    step: 1,
    selectedStudents: [],
    sessionType: 'group',
    currentStudent: null,
    sessionStarted: false,
    assessmentData: {},
    showSummary: false
  })
  const [editingSummaryFields, setEditingSummaryFields] = useState({})
  const [tempSummaryData, setTempSummaryData] = useState({})
  const [isTimetableSettingsOpen, setIsTimetableSettingsOpen] = useState(false)
  const [editingStudent, setEditingStudent] = useState(null)
  const [tempStudentData, setTempStudentData] = useState({})
  const [selectedStudentForSession, setSelectedStudentForSession] = useState(null)
  const [isStudentSessionModalOpen, setIsStudentSessionModalOpen] = useState(false)
  const [sessionsSortBy, setSessionsSortBy] = useState('name') // 'name', 'level', 'progress', 'absence'
  const [sessionsSortOrder, setSessionsSortOrder] = useState('asc') // 'asc', 'desc'
  const [sessionsViewMode, setSessionsViewMode] = useState('grid') // 'grid', 'list'
  const [timetableSettings, setTimetableSettings] = useState({
    action: 'add', // 'add', 'delete', 'addDay'
    selectedDay: 'Monday',
    newTimeSlot: { time: '', class: '', grade: '', level: 'PINK', location: '' },
    selectedSlotIndex: null
  })

  const handleLogout = async () => {
    try {
      await authService.logout()
      router.replace('/landing')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const getGradeFromClass = (className: string) => {
    if (className.includes('3A')) return '3A'
    if (className.includes('3B')) return '3B'
    if (className.includes('3C')) return '3C'
    if (className.includes('3D')) return '3D'
    if (className.includes('3E')) return '3E'
    return null
  }

  const handleViewDetails = (session: any) => {
    setSelectedSession(session)
    setIsSessionModalOpen(true)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Excellent': return 'text-green-600 bg-green-50'
      case 'On Track': return 'text-blue-600 bg-blue-50'
      case 'Needs Support': return 'text-orange-600 bg-orange-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const handleEditStat = (statKey: string) => {
    setEditingStats(prev => ({ ...prev, [statKey]: true }))
    setTempStats(prev => ({ ...prev, [statKey]: tutorData.learnerStats?.[statKey] || 0 }))
  }

  const handleSaveStat = (statKey: string) => {
    const newValue = parseInt(tempStats[statKey]) || 0
    setTutorData(prev => ({
      ...prev,
      learnerStats: {
        ...prev.learnerStats,
        [statKey]: newValue,
        totalLearners: statKey === 'totalLearners' ? newValue : 
          (statKey === 'grade3A' || statKey === 'grade3B' || statKey === 'grade3C' || statKey === 'grade3D') ?
          prev.learnerStats.grade3A + prev.learnerStats.grade3B + prev.learnerStats.grade3C + prev.learnerStats.grade3D - prev.learnerStats[statKey] + newValue :
          prev.learnerStats.totalLearners
      }
    }))
    setEditingStats(prev => ({ ...prev, [statKey]: false }))
    setTempStats(prev => ({ ...prev, [statKey]: undefined }))
  }

  const handleCancelEdit = (statKey: string) => {
    setEditingStats(prev => ({ ...prev, [statKey]: false }))
    setTempStats(prev => ({ ...prev, [statKey]: undefined }))
  }

  const handleStatChange = (statKey: string, value: string) => {
    setTempStats(prev => ({ ...prev, [statKey]: value }))
  }

  // Level distribution editing functions
  const handleEditLevel = (level: string) => {
    setEditingLevels(prev => ({ ...prev, [level]: true }))
    const levelData = tutorData.levelDistribution?.find(l => l.level === level)
    setTempLevels(prev => ({ ...prev, [level]: levelData?.count || 0 }))
  }

  const handleSaveLevel = (level: string) => {
    const newCount = parseInt(tempLevels[level]) || 0
    const total = tutorData.levelDistribution?.reduce((sum, l) => sum + (l.level === level ? newCount : l.count), 0) || 0
    
    setTutorData(prev => ({
      ...prev,
      levelDistribution: prev.levelDistribution?.map(l => 
        l.level === level 
          ? { ...l, count: newCount, percentage: Math.round((newCount / total) * 100) }
          : { ...l, percentage: Math.round((l.count / total) * 100) }
      )
    }))
    setEditingLevels(prev => ({ ...prev, [level]: false }))
    setTempLevels(prev => ({ ...prev, [level]: undefined }))
  }

  const handleCancelLevelEdit = (level: string) => {
    setEditingLevels(prev => ({ ...prev, [level]: false }))
    setTempLevels(prev => ({ ...prev, [level]: undefined }))
  }

  const handleLevelChange = (level: string, value: string) => {
    setTempLevels(prev => ({ ...prev, [level]: value }))
  }

  // Timetable editing functions
  const handleEditTimetableSlot = (day: string, index: number) => {
    const key = `${day}-${index}`
    setEditingTimetable(prev => ({ ...prev, [key]: true }))
    const slot = tutorData.timetable?.[day]?.[index]
    setTempTimetable(prev => ({ ...prev, [key]: slot?.class || '' }))
  }

  const handleSaveTimetableSlot = (day: string, index: number) => {
    const key = `${day}-${index}`
    const newClass = tempTimetable[key] || ''
    
    setTutorData(prev => ({
      ...prev,
      timetable: {
        ...prev.timetable,
        [day]: prev.timetable[day]?.map((slot, i) => 
          i === index ? { ...slot, class: newClass } : slot
        )
      }
    }))
    setEditingTimetable(prev => ({ ...prev, [key]: false }))
    setTempTimetable(prev => ({ ...prev, [key]: undefined }))
  }

  const handleCancelTimetableEdit = (day: string, index: number) => {
    const key = `${day}-${index}`
    setEditingTimetable(prev => ({ ...prev, [key]: false }))
    setTempTimetable(prev => ({ ...prev, [key]: undefined }))
  }

  const handleTimetableChange = (day: string, index: number, value: string) => {
    const key = `${day}-${index}`
    setTempTimetable(prev => ({ ...prev, [key]: value }))
  }

  // Session editing functions
  const handleEditSession = () => {
    setEditingSession(true)
    setTempSession(JSON.parse(JSON.stringify(selectedSession))) // Deep copy
  }

  const handleSaveSession = () => {
    // Update the session in the timetable data
    const sessionId = selectedSession.sessionId
    setTutorData(prev => ({
      ...prev,
      timetable: {
        ...prev.timetable,
        [selectedDay]: prev.timetable[selectedDay]?.map(slot => 
          slot.sessionId === sessionId ? tempSession : slot
        )
      }
    }))
    setSelectedSession(tempSession)
    setEditingSession(false)
    setTempSession(null)
  }

  const handleCancelSessionEdit = () => {
    setEditingSession(false)
    setTempSession(null)
  }

  const handleDeleteSession = () => {
    if (confirm('Are you sure you want to delete this session? This action cannot be undone.')) {
      const sessionId = selectedSession.sessionId
      setTutorData(prev => ({
        ...prev,
        timetable: {
          ...prev.timetable,
          [selectedDay]: prev.timetable[selectedDay]?.map(slot => 
            slot.sessionId === sessionId 
              ? { time: slot.time, class: "", type: "free" }
              : slot
          )
        }
      }))
      setIsSessionModalOpen(false)
      setSelectedSession(null)
    }
  }

  const handleSessionFieldChange = (field: string, value: any) => {
    setTempSession(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleLessonFieldChange = (field: string, value: any) => {
    setTempSession(prev => ({
      ...prev,
      lesson: {
        ...prev.lesson,
        [field]: value
      }
    }))
  }

  const handleStudentChange = (studentIndex: number, field: string, value: any) => {
    setTempSession(prev => ({
      ...prev,
      students: prev.students?.map((student, index) => 
        index === studentIndex 
          ? { ...student, [field]: value }
          : student
      )
    }))
  }

  const handleRemoveStudent = (studentIndex: number) => {
    if (confirm('Are you sure you want to remove this student from the session?')) {
      setTempSession(prev => ({
        ...prev,
        students: prev.students.filter((_, index) => index !== studentIndex)
      }))
    }
  }

  const handleAddStudent = () => {
    const newStudent = {
      name: "New Student",
      progress: 75,
      status: "On Track"
    }
    setTempSession(prev => ({
      ...prev,
      students: [...prev.students, newStudent]
    }))
  }

  // Session start functions
  const handleStartSession = () => {
    setIsStartingSession(true)
    setSessionOnboarding({
      step: 1,
      selectedStudents: [],
      sessionType: 'group',
      currentStudent: null,
      sessionStarted: false
    })
  }

  const handleStudentSelection = (student, isSelected) => {
    setSessionOnboarding(prev => ({
      ...prev,
      selectedStudents: isSelected 
        ? [...prev.selectedStudents, student]
        : prev.selectedStudents.filter(s => s.name !== student.name)
    }))
  }

  const handleSessionTypeChange = (type) => {
    setSessionOnboarding(prev => ({
      ...prev,
      sessionType: type,
      selectedStudents: type === 'individual' ? [] : prev.selectedStudents
    }))
  }

  const handleNextStep = () => {
    if (sessionOnboarding.step === 1) {
      // Move to student selection confirmation
      setSessionOnboarding(prev => ({ ...prev, step: 2 }))
    } else if (sessionOnboarding.step === 2) {
      // Start the actual session
      if (sessionOnboarding.sessionType === 'individual' && sessionOnboarding.selectedStudents.length > 0) {
        setSessionOnboarding(prev => ({ 
          ...prev, 
          step: 3,
          currentStudent: prev.selectedStudents[0],
          sessionStarted: true
        }))
      } else if (sessionOnboarding.sessionType === 'group' && sessionOnboarding.selectedStudents.length > 0) {
        setSessionOnboarding(prev => ({ 
          ...prev, 
          step: 3,
          sessionStarted: true
        }))
      }
    }
  }

  const handlePreviousStep = () => {
    setSessionOnboarding(prev => ({ 
      ...prev, 
      step: Math.max(1, prev.step - 1)
    }))
  }

  const handleCloseSessionStart = () => {
    setIsStartingSession(false)
    setSessionOnboarding({
      step: 1,
      selectedStudents: [],
      sessionType: 'group',
      currentStudent: null,
      sessionStarted: false
    })
  }

  const handleCompleteSession = () => {
    // Collect assessment data from form
    const assessmentData = {
      lessonCovered: document.getElementById('lesson-covered')?.value || selectedSession.lesson.title,
      level: document.getElementById('level-select')?.value || selectedSession.level,
      rateLesson: document.getElementById('rate-lesson')?.value || '10',
      blending: document.querySelector('input[name="blending"]:checked')?.value || 'na',
      segment: document.querySelector('input[name="segment"]:checked')?.value || 'na',
      phonemeManipulation: document.querySelector('input[name="phoneme-manipulation"]:checked')?.value || 'na',
      soundPatternPractice: document.querySelector('input[name="sound-pattern-practice"]:checked')?.value || 'na',
      spelling: document.querySelector('input[name="spelling"]:checked')?.value || 'na',
      highFrequencyWords: document.querySelector('input[name="high-frequency-words"]:checked')?.value || 'na',
      createSentences: document.querySelector('input[name="create-sentences"]:checked')?.value || 'na',
      pairedReading: document.querySelector('input[name="paired-reading"]:checked')?.value || 'na',
      bookTitle: document.getElementById('book-title')?.value || 'N/A',
      pageNo: document.getElementById('page-no')?.value || 'N/A',
      challengingSounds: document.getElementById('challenging-sounds')?.value || 'None',
      challengingWords: document.getElementById('challenging-words')?.value || 'None',
      comments: document.getElementById('comments')?.value || '',
      date: new Date().toLocaleDateString(),
      startTime: selectedSession.time.split(' - ')[0],
      finishTime: selectedSession.time.split(' - ')[1],
      studentNotes: sessionOnboarding.selectedStudents?.map((student, index) => ({
        ...student,
        specificChallenges: document.getElementById(`student-${index}-challenges`)?.value || '',
        progressRating: document.getElementById(`student-${index}-progress`)?.value || '8',
        individualNotes: document.getElementById(`student-${index}-notes`)?.value || ''
      })) || []
    }

    // Store assessment data and show summary
    setSessionOnboarding(prev => ({
      ...prev,
      assessmentData,
      showSummary: true
    }))
  }

  const handleFinalizeSession = () => {
    // Update student progress
    const updatedStudents = sessionOnboarding.selectedStudents?.map(student => ({
      ...student,
      progress: Math.min(100, student.progress + Math.floor(Math.random() * 10) + 5) // Simulate progress
    })) || []

    // Update the session data
    const sessionId = selectedSession.sessionId
    setTutorData(prev => ({
      ...prev,
      timetable: {
        ...prev.timetable,
        [selectedDay]: prev.timetable[selectedDay]?.map(slot => 
          slot.sessionId === sessionId 
            ? { ...slot, students: slot.students?.map(s => 
                updatedStudents.find(us => us.name === s.name) || s
              )}
            : slot
        )
      }
    }))

    // Close all modals
    handleCloseSessionStart()
    setIsSessionModalOpen(false)
    
    // Show success message
    alert(`Session completed! Progress updated for ${updatedStudents.length} student(s).`)
  }

  // Summary editing functions
  const handleEditSummaryField = (studentIndex: number, fieldType: string) => {
    const key = `${studentIndex}-${fieldType}`
    setEditingSummaryFields(prev => ({ ...prev, [key]: true }))
    
    const currentData = sessionOnboarding.assessmentData.studentNotes?.[studentIndex]
    if (currentData) {
      setTempSummaryData(prev => ({
        ...prev,
        [key]: currentData[fieldType] || (fieldType === 'progressRating' ? '8' : '')
      }))
    }
  }

  const handleSaveSummaryField = (studentIndex: number, fieldType: string) => {
    const key = `${studentIndex}-${fieldType}`
    const newValue = tempSummaryData[key]

    if (fieldType === 'progressRating' && (newValue < 1 || newValue > 10)) {
      alert('Progress rating must be between 1 and 10')
      return
    }

    // Update the assessment data
    setSessionOnboarding(prev => ({
      ...prev,
      assessmentData: {
        ...prev.assessmentData,
        studentNotes: prev.assessmentData.studentNotes?.map((note, index) => 
          index === studentIndex 
            ? { ...note, [fieldType]: newValue }
            : note
        ) || []
      }
    }))

    setEditingSummaryFields(prev => ({ ...prev, [key]: false }))
    setTempSummaryData(prev => ({ ...prev, [key]: undefined }))
  }

  const handleCancelSummaryEdit = (studentIndex: number, fieldType: string) => {
    const key = `${studentIndex}-${fieldType}`
    setEditingSummaryFields(prev => ({ ...prev, [key]: false }))
    setTempSummaryData(prev => ({ ...prev, [key]: undefined }))
  }

  const handleSummaryFieldChange = (studentIndex: number, fieldType: string, value: string) => {
    const key = `${studentIndex}-${fieldType}`
    setTempSummaryData(prev => ({ ...prev, [key]: value }))
  }

  // Student editing functions
  const handleEditStudent = (studentId: number) => {
    const student = tutorData.students?.find(s => s.id === studentId)
    if (student) {
      setEditingStudent(studentId)
      setTempStudentData(student)
    }
  }

  const handleSaveStudent = () => {
    if (!editingStudent) return

    setTutorData(prev => ({
      ...prev,
      students: prev.students?.map(student => 
        student.id === editingStudent ? tempStudentData : student
      ) || []
    }))

    setEditingStudent(null)
    setTempStudentData({})
  }

  const handleCancelStudentEdit = () => {
    setEditingStudent(null)
    setTempStudentData({})
  }

  const handleStudentFieldChange = (field: string, value: string | number) => {
    setTempStudentData(prev => ({ ...prev, [field]: value }))
  }

  const getAbsenceColor = (absences: number) => {
    if (absences === 0) return 'text-green-600 bg-green-50'
    if (absences <= 2) return 'text-yellow-600 bg-yellow-50'
    return 'text-red-600 bg-red-50'
  }

  // Student session modal functions
  const handleOpenStudentSession = (student, isNewCourse = false) => {
    const levelProgress = {
      'PINK': 25,
      'BLUE': 50, 
      'YELLOW': 75,
      'PURPLE': 90
    }
    const baseProgress = levelProgress[student.level] || 0
    const absenceReduction = student.absence * 5
    const finalProgress = Math.max(0, baseProgress - absenceReduction)
    
    setSelectedStudentForSession({
      ...student,
      progress: finalProgress,
      isNewCourse,
      sessionsCompleted: Math.floor(finalProgress / 10),
      totalSessions: 10,
      nextMilestone: finalProgress >= 75 ? 'Course Completion' : 'Level Advancement',
      estimatedCompletion: isNewCourse ? '4 weeks' : `${Math.ceil((100 - finalProgress) / 10)} weeks`,
      lastSession: isNewCourse ? 'None' : '2 days ago',
      strengths: ['Letter recognition', 'Sound matching'],
      challenges: student.absence > 2 ? ['Attendance consistency', 'Practice retention'] : ['Complex blends', 'Reading fluency']
    })
    setIsStudentSessionModalOpen(true)
  }

  const handleCloseStudentSession = () => {
    setSelectedStudentForSession(null)
    setIsStudentSessionModalOpen(false)
  }

  // Sorting function for sessions
  const getSortedStudents = (students) => {
    if (!students) return []
    
    const studentsWithProgress = students.map(student => {
      const levelProgress = { 'PINK': 25, 'BLUE': 50, 'YELLOW': 75, 'PURPLE': 90 }
      const baseProgress = levelProgress[student.level] || 0
      const absenceReduction = student.absence * 5
      const finalProgress = Math.max(0, baseProgress - absenceReduction)
      return { ...student, calculatedProgress: finalProgress }
    })

    return studentsWithProgress.sort((a, b) => {
      let comparison = 0
      
      switch (sessionsSortBy) {
        case 'name':
          comparison = `${a.name} ${a.surname}`.localeCompare(`${b.name} ${b.surname}`)
          break
        case 'level':
          const levelOrder = { 'PINK': 1, 'BLUE': 2, 'YELLOW': 3, 'PURPLE': 4 }
          comparison = (levelOrder[a.level] || 0) - (levelOrder[b.level] || 0)
          break
        case 'progress':
          comparison = a.calculatedProgress - b.calculatedProgress
          break
        case 'absence':
          comparison = a.absence - b.absence
          break
        default:
          comparison = 0
      }
      
      return sessionsSortOrder === 'desc' ? -comparison : comparison
    })
  }

  const handleSessionsSort = (sortBy) => {
    if (sessionsSortBy === sortBy) {
      setSessionsSortOrder(sessionsSortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSessionsSortBy(sortBy)
      setSessionsSortOrder('asc')
    }
  }

  const handleStartIndividualSession = () => {
    const student = selectedStudentForSession
    
    // Create a mock session object for individual student
    const mockIndividualSession = {
      sessionId: `individual-${student.id}-${Date.now()}`,
      time: "Individual Session",
      class: `Individual - ${student.name} ${student.surname}`,
      grade: student.level === 'PINK' ? '3C' : student.level === 'BLUE' ? '3B' : student.level === 'YELLOW' ? '3C' : '3D',
      group: `${student.name}'s Session`,
      level: student.level,
      location: "Individual Room",
      students: [
        {
          name: `${student.name} ${student.surname}`,
          progress: student.progress,
          status: student.progress >= 75 ? "Excellent" : student.progress >= 50 ? "On Track" : "Needs Support"
        }
      ],
      lesson: {
        title: student.lesson,
        objectives: student.isNewCourse 
          ? ["Identify single letter sounds", "Match sounds to letters", "Practice phoneme isolation"]
          : ["Continue current lesson objectives", "Build on previous progress", "Address focus areas"],
        materials: student.isNewCourse 
          ? ["Sound cards", "Letter tiles", "Audio recordings"]
          : ["Lesson materials", "Progress tracking sheets", "Interactive activities"],
        activities: student.isNewCourse 
          ? ["Sound matching game", "Letter sound practice", "Individual assessment"]
          : ["Skill reinforcement", "Progress evaluation", "Targeted practice"]
      }
    }

    // Set up the session onboarding for individual student
    setSelectedSession(mockIndividualSession)
    setSelectedDay("Individual")
    
    const sessionOnboardingData = {
      step: 3, // Skip directly to Session Assessment (Step 3)
      selectedStudents: [
        {
          name: `${student.name} ${student.surname}`,
          progress: student.progress,
          status: student.progress >= 75 ? "Excellent" : student.progress >= 50 ? "On Track" : "Needs Support"
        }
      ],
      sessionType: 'individual', // Force individual session
      currentStudent: null,
      sessionStarted: true, // Mark as started since we're going to assessment
      assessmentData: {},
      showSummary: false,
      // Add session data directly to onboarding state for immediate access
      sessionData: {
        grade: student.level === 'PINK' ? '3C' : student.level === 'BLUE' ? '3B' : student.level === 'YELLOW' ? '3C' : '3D',
        level: student.level,
        lesson: {
          title: student.lesson,
          objectives: student.isNewCourse 
            ? ["Identify single letter sounds", "Match sounds to letters", "Practice phoneme isolation"]
            : ["Continue current lesson objectives", "Build on previous progress", "Address focus areas"],
          materials: student.isNewCourse 
            ? ["Sound cards", "Letter tiles", "Audio recordings"]
            : ["Lesson materials", "Progress tracking sheets", "Interactive activities"]
        }
      }
    }
    setSessionOnboarding(sessionOnboardingData)

    // Close the student details modal and open session onboarding
    handleCloseStudentSession()
    setIsStartingSession(true)
  }

  const handleBackToAssessment = () => {
    setSessionOnboarding(prev => ({
      ...prev,
      showSummary: false
    }))
  }

  // Timetable management functions
  const handleOpenTimetableSettings = () => {
    setIsTimetableSettingsOpen(true)
    setTimetableSettings({
      action: 'add',
      selectedDay: selectedDay,
      newTimeSlot: { time: '', class: '', grade: '', level: 'PINK', location: '' },
      selectedSlotIndex: null
    })
  }

  const handleCloseTimetableSettings = () => {
    setIsTimetableSettingsOpen(false)
  }

  const handleTimetableActionChange = (action) => {
    setTimetableSettings(prev => ({ ...prev, action }))
  }

  const handleTimetableFieldChange = (field, value) => {
    setTimetableSettings(prev => ({
      ...prev,
      newTimeSlot: { ...prev.newTimeSlot, [field]: value }
    }))
  }

  const handleAddTimeSlot = () => {
    const { selectedDay, newTimeSlot } = timetableSettings
    
    if (!newTimeSlot.time || !newTimeSlot.class) {
      alert('Please fill in both time and class fields.')
      return
    }

    const newSlot = {
      time: newTimeSlot.time,
      class: newTimeSlot.class,
      ...(newTimeSlot.grade && { 
        sessionId: `custom-${Date.now()}`,
        grade: newTimeSlot.grade,
        group: newTimeSlot.class,
        level: newTimeSlot.level,
        location: newTimeSlot.location || 'TBD',
        students: [],
        lesson: {
          title: 'Custom Lesson',
          objectives: ['To be defined'],
          materials: ['To be defined'],
          activities: ['To be defined']
        }
      })
    }

    setTutorData(prev => ({
      ...prev,
      timetable: {
        ...prev.timetable,
                  [selectedDay]: [...(prev.timetable[selectedDay] || []), newSlot].sort((a, b) => {
          const timeA = a.time.split(' - ')[0]
          const timeB = b.time.split(' - ')[0]
          return timeA.localeCompare(timeB)
        })
      }
    }))

    // Reset form
    setTimetableSettings(prev => ({
      ...prev,
      newTimeSlot: { time: '', class: '', grade: '', level: 'PINK', location: '' }
    }))
    
    alert('Time slot added successfully!')
  }

  const handleDeleteTimeSlot = (day, slotIndex) => {
    if (confirm('Are you sure you want to delete this time slot?')) {
      setTutorData(prev => ({
        ...prev,
        timetable: {
          ...prev.timetable,
          [day]: prev.timetable[day]?.filter((_, index) => index !== slotIndex) || []
        }
      }))
      alert('Time slot deleted successfully!')
    }
  }

  const handleAddNewDay = () => {
    const newDayName = prompt('Enter the name for the new day:')
    if (newDayName && !tutorData.timetable?.[newDayName]) {
      setTutorData(prev => ({
        ...prev,
        timetable: {
          ...prev.timetable,
          [newDayName]: [
            { time: "08:00 - 08:30", class: "" },
            { time: "08:30 - 09:00", class: "" },
            { time: "09:00 - 09:30", class: "" },
            { time: "09:30 - 10:30", class: "" },
            { time: "10:30 - 11:00", class: "" },
            { time: "11:00 - 11:45", class: "LUNCH", type: "break" },
            { time: "12:00 - 12:30", class: "" },
            { time: "12:30 - 13:00", class: "" },
            { time: "13:00 - 13:30", class: "" },
            { time: "13:30 - 14:30", class: "Records of sessions", type: "admin" }
          ]
        }
      }))
      alert(`Day "${newDayName}" added successfully!`)
    } else if (tutorData.timetable?.[newDayName]) {
      alert('A day with this name already exists.')
    }
  }

  const handleDeleteDay = (dayToDelete) => {
    if (Object.keys(tutorData.timetable || {}).length <= 1) {
      alert('Cannot delete the last remaining day.')
      return
    }
    
    if (confirm(`Are you sure you want to delete "${dayToDelete}" and all its time slots?`)) {
      setTutorData(prev => {
        const newTimetable = { ...prev.timetable }
        delete newTimetable[dayToDelete]
        return {
          ...prev,
          timetable: newTimetable
        }
      })
      
      // Switch to first available day if current day was deleted
      if (selectedDay === dayToDelete) {
        const remainingDays = Object.keys(tutorData.timetable || {}).filter(day => day !== dayToDelete)
        setSelectedDay(remainingDays[0])
      }
      
      alert(`Day "${dayToDelete}" deleted successfully!`)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <GraduationCap className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Tutor Dashboard</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-5 w-5" />
              </Button>
              
              <div className="flex items-center space-x-3">
                <Avatar className="h-8 w-8">
                  <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold">
                    {tutorData.firstName?.[0] || 'T'}{tutorData.lastName?.[0] || 'U'}
                  </div>
                </Avatar>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-900">{tutorData.firstName || 'Tutor'} {tutorData.lastName || 'User'}</p>
                  <p className="text-xs text-gray-500">Tutor</p>
                </div>
              </div>
              
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="sessions">Sessions</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* Learner Count Boxes */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {/* Total Learners */}
              <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white relative group">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Learners</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4" />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 text-white hover:bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handleEditStat('totalLearners')}
                    >
                      ⚙️
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {editingStats.totalLearners ? (
                    <div className="flex items-center space-x-2">
                      <Input
                        type="number"
                        value={tempStats.totalLearners || ''}
                        onChange={(e) => handleStatChange('totalLearners', e.target.value)}
                        className="text-2xl font-bold bg-white/20 border-white/30 text-white placeholder-white/60 h-12 w-20"
                        min="0"
                      />
                      <div className="flex flex-col space-y-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-5 w-5 p-0 text-white hover:bg-white/20"
                          onClick={() => handleSaveStat('totalLearners')}
                        >
                          <Save className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-5 w-5 p-0 text-white hover:bg-white/20"
                          onClick={() => handleCancelEdit('totalLearners')}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-3xl font-bold">{tutorData.learnerStats?.totalLearners || 0}</div>
                  )}
                  <p className="text-xs text-blue-100">All grades combined</p>
                </CardContent>
              </Card>

              {/* Grade 3A */}
              <Card className="relative group">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Grade 3A</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Badge className={gradeColors["3A"]}>3A</Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 text-gray-500 hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handleEditStat('grade3A')}
                    >
                      ⚙️
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {editingStats.grade3A ? (
                    <div className="flex items-center space-x-2">
                      <Input
                        type="number"
                        value={tempStats.grade3A || ''}
                        onChange={(e) => handleStatChange('grade3A', e.target.value)}
                        className="text-2xl font-bold h-10 w-16"
                        min="0"
                      />
                      <div className="flex flex-col space-y-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-5 w-5 p-0 text-green-600 hover:bg-green-50"
                          onClick={() => handleSaveStat('grade3A')}
                        >
                          <Save className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-5 w-5 p-0 text-red-600 hover:bg-red-50"
                          onClick={() => handleCancelEdit('grade3A')}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-2xl font-bold">{tutorData.learnerStats?.grade3A || 0}</div>
                  )}
                  <p className="text-xs text-muted-foreground">Learners</p>
                </CardContent>
              </Card>

              {/* Grade 3B */}
              <Card className="relative group">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Grade 3B</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Badge className={gradeColors["3B"]}>3B</Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 text-gray-500 hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handleEditStat('grade3B')}
                    >
                      ⚙️
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {editingStats.grade3B ? (
                    <div className="flex items-center space-x-2">
                      <Input
                        type="number"
                        value={tempStats.grade3B || ''}
                        onChange={(e) => handleStatChange('grade3B', e.target.value)}
                        className="text-2xl font-bold h-10 w-16"
                        min="0"
                      />
                      <div className="flex flex-col space-y-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-5 w-5 p-0 text-green-600 hover:bg-green-50"
                          onClick={() => handleSaveStat('grade3B')}
                        >
                          <Save className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-5 w-5 p-0 text-red-600 hover:bg-red-50"
                          onClick={() => handleCancelEdit('grade3B')}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-2xl font-bold">{tutorData.learnerStats?.grade3B || 0}</div>
                  )}
                  <p className="text-xs text-muted-foreground">Learners</p>
                </CardContent>
              </Card>

              {/* Grade 3C */}
              <Card className="relative group">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Grade 3C</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Badge className={gradeColors["3C"]}>3C</Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 text-gray-500 hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handleEditStat('grade3C')}
                    >
                      ⚙️
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {editingStats.grade3C ? (
                    <div className="flex items-center space-x-2">
                      <Input
                        type="number"
                        value={tempStats.grade3C || ''}
                        onChange={(e) => handleStatChange('grade3C', e.target.value)}
                        className="text-2xl font-bold h-10 w-16"
                        min="0"
                      />
                      <div className="flex flex-col space-y-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-5 w-5 p-0 text-green-600 hover:bg-green-50"
                          onClick={() => handleSaveStat('grade3C')}
                        >
                          <Save className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-5 w-5 p-0 text-red-600 hover:bg-red-50"
                          onClick={() => handleCancelEdit('grade3C')}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-2xl font-bold">{tutorData.learnerStats?.grade3C || 0}</div>
                  )}
                  <p className="text-xs text-muted-foreground">Learners</p>
                </CardContent>
              </Card>

              {/* Grade 3D */}
              <Card className="relative group">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Grade 3D</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Badge className={gradeColors["3D"]}>3D</Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 text-gray-500 hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handleEditStat('grade3D')}
                    >
                      ⚙️
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {editingStats.grade3D ? (
                    <div className="flex items-center space-x-2">
                      <Input
                        type="number"
                        value={tempStats.grade3D || ''}
                        onChange={(e) => handleStatChange('grade3D', e.target.value)}
                        className="text-2xl font-bold h-10 w-16"
                        min="0"
                      />
                      <div className="flex flex-col space-y-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-5 w-5 p-0 text-green-600 hover:bg-green-50"
                          onClick={() => handleSaveStat('grade3D')}
                        >
                          <Save className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-5 w-5 p-0 text-red-600 hover:bg-red-50"
                          onClick={() => handleCancelEdit('grade3D')}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-2xl font-bold">{tutorData.learnerStats?.grade3D || 0}</div>
                  )}
                  <p className="text-xs text-muted-foreground">Learners</p>
                </CardContent>
              </Card>
            </div>

            {/* Level Distribution Graph */}
            <Card className="group">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5" />
                    <span>Learner Level Distribution</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 text-gray-500 hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => {/* We'll add a general settings modal for this */}}
                  >
                    ⚙️
                  </Button>
                </CardTitle>
                <CardDescription>Distribution of learners across Phono-Graphix levels</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tutorData.levelDistribution?.map((level) => (
                    <div key={level.level} className="flex items-center justify-between group/level">
                      <div className="flex items-center space-x-3 min-w-0 flex-1">
                        <Badge className={levelColors[level.level]}>{level.level}</Badge>
                        {editingLevels[level.level] ? (
                          <div className="flex items-center space-x-2">
                            <Input
                              type="number"
                              value={tempLevels[level.level] || ''}
                              onChange={(e) => handleLevelChange(level.level, e.target.value)}
                              className="w-16 h-6 text-sm"
                              min="0"
                            />
                            <span className="text-sm font-medium">learners</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-5 w-5 p-0 text-green-600 hover:bg-green-50"
                              onClick={() => handleSaveLevel(level.level)}
                            >
                              <Save className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-5 w-5 p-0 text-red-600 hover:bg-red-50"
                              onClick={() => handleCancelLevelEdit(level.level)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium">{level.count} learners</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-5 w-5 p-0 text-gray-400 hover:bg-gray-100 opacity-0 group-hover/level:opacity-100 transition-opacity"
                              onClick={() => handleEditLevel(level.level)}
                            >
                              <Edit className="h-3 w-3" />
                            </Button>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center space-x-3 min-w-0 flex-1">
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div 
                            className={`h-3 rounded-full transition-all duration-500 ${
                              level.level === 'PINK' ? 'bg-pink-500' :
                              level.level === 'BLUE' ? 'bg-blue-500' :
                              level.level === 'YELLOW' ? 'bg-yellow-500' :
                              'bg-purple-500'
                            }`}
                            style={{ width: `${level.percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-600 min-w-0 w-12">{level.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Weekly Timetable */}
            <Card className="group">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5" />
                    <span>Weekly Timetable</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 text-gray-500 hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={handleOpenTimetableSettings}
                  >
                    ⚙️
                  </Button>
                </CardTitle>
                <CardDescription>Your teaching schedule for the week</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Day Selector */}
                <div className="flex space-x-2 mb-6 overflow-x-auto">
                  {Object.keys(tutorData.timetable || {}).map((day) => (
                    <Button
                      key={day}
                      variant={selectedDay === day ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedDay(day)}
                      className="whitespace-nowrap"
                    >
                      {day}
                    </Button>
                  ))}
                </div>

                {/* Timetable for Selected Day */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-lg mb-4">{selectedDay}</h4>
                  {tutorData.timetable[selectedDay]?.map((slot, index) => {
                    const grade = getGradeFromClass(slot.class)
                    const isLunch = slot.type === "break"
                    const isRecords = slot.type === "admin"
                    const isEmpty = slot.class === ""
                    const hasDetails = slot.sessionId
                    const editKey = `${selectedDay}-${index}`
                    const isEditing = editingTimetable[editKey]
                    
                    return (
                      <div 
                        key={index} 
                        className={`flex items-center justify-between p-4 rounded-lg border group/slot ${
                          isLunch ? 'bg-yellow-50 border-yellow-200' :
                          isRecords ? 'bg-gray-50 border-gray-200' :
                          isEmpty ? 'bg-gray-25 border-gray-100' :
                          'bg-white border-gray-200 hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center space-x-4 flex-1">
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-gray-500" />
                            <span className="font-medium text-sm min-w-0 w-24">{slot.time}</span>
                          </div>
                          
                          {isEditing ? (
                            <div className="flex items-center space-x-2 flex-1">
                              <Input
                                type="text"
                                value={tempTimetable[editKey] || ''}
                                onChange={(e) => handleTimetableChange(selectedDay, index, e.target.value)}
                                className="flex-1 h-8 text-sm"
                                placeholder="Enter class name..."
                              />
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0 text-green-600 hover:bg-green-50"
                                onClick={() => handleSaveTimetableSlot(selectedDay, index)}
                              >
                                <Save className="h-3 w-3" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0 text-red-600 hover:bg-red-50"
                                onClick={() => handleCancelTimetableEdit(selectedDay, index)}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          ) : (
                            <>
                              {hasDetails && (
                                <div className="flex items-center space-x-3">
                                  <Badge className={gradeColors[slot.grade]} variant="outline">
                                    {slot.grade}
                                  </Badge>
                                  <Badge className={levelColors[slot.level]}>
                                    {slot.level}
                                  </Badge>
                                  <div className="flex items-center space-x-2">
                                    <MapPin className="h-3 w-3 text-gray-400" />
                                    <span className="text-xs text-gray-500">{slot.location}</span>
                                  </div>
                                  <span className="text-sm text-gray-900">{slot.group}</span>
                                </div>
                              )}
                              
                              {!isEmpty && !hasDetails && (
                                <div className="flex items-center space-x-3">
                                  {grade && (
                                    <Badge className={gradeColors[grade]} variant="outline">
                                      {grade}
                                    </Badge>
                                  )}
                                  <span className={`text-sm ${
                                    isLunch ? 'font-semibold text-yellow-800' :
                                    isRecords ? 'font-medium text-gray-600' :
                                    'text-gray-900'
                                  }`}>
                                    {slot.class}
                                  </span>
                                </div>
                              )}
                              
                              {isEmpty && (
                                <span className="text-sm text-gray-400 italic">Free period</span>
                              )}
                              
                              {/* Edit and Delete buttons for non-detailed slots */}
                              {(!isLunch && !hasDetails) && (
                                <div className="flex items-center space-x-1 opacity-0 group-hover/slot:opacity-100 transition-opacity ml-2">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-5 w-5 p-0 text-gray-400 hover:bg-gray-100"
                                    onClick={() => handleEditTimetableSlot(selectedDay, index)}
                                  >
                                    <Edit className="h-3 w-3" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-5 w-5 p-0 text-red-400 hover:bg-red-50"
                                    onClick={() => handleDeleteTimeSlot(selectedDay, index)}
                                  >
                                    🗑️
                                  </Button>
                                </div>
                              )}
                            </>
                          )}
                        </div>
                        
                        {hasDetails && !isEditing && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleViewDetails(slot)}
                          >
                            View Details
                          </Button>
                        )}
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Students Tab */}
          <TabsContent value="students" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>My Students</span>
                </CardTitle>
                <CardDescription>
                  Manage your students' information, track their progress levels, lessons, and attendance
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!tutorData.students ? (
                  <div className="text-center py-8">
                    <div className="text-gray-500">Loading students...</div>
                  </div>
                ) : tutorData.students.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="text-gray-500">No students found.</div>
                  </div>
                ) : (
                  <>
                {/* Summary Statistics */}
                <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{tutorData.students?.length || 0}</div>
                        <div className="text-sm text-gray-600">Total Students</div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">
                          {tutorData.students?.filter(s => s.absence === 0).length || 0}
                        </div>
                        <div className="text-sm text-gray-600">Perfect Attendance</div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-yellow-600">
                          {tutorData.students?.filter(s => s.absence > 0 && s.absence <= 2).length || 0}
                        </div>
                        <div className="text-sm text-gray-600">Minor Absences</div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-red-600">
                          {tutorData.students?.filter(s => s.absence > 2).length || 0}
                        </div>
                        <div className="text-sm text-gray-600">High Absences</div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-200">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-700">Name</th>
                        <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-700">Surname</th>
                        <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-700">Level</th>
                        <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-700">Lesson</th>
                        <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-700">Absence</th>
                        <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tutorData.students?.map((student) => (
                        <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                          {editingStudent === student.id ? (
                            // Edit mode
                            <>
                              <td className="border border-gray-200 px-4 py-3">
                                <Input
                                  value={tempStudentData.name || ''}
                                  onChange={(e) => handleStudentFieldChange('name', e.target.value)}
                                  className="w-full"
                                  placeholder="First name"
                                />
                              </td>
                              <td className="border border-gray-200 px-4 py-3">
                                <Input
                                  value={tempStudentData.surname || ''}
                                  onChange={(e) => handleStudentFieldChange('surname', e.target.value)}
                                  className="w-full"
                                  placeholder="Last name"
                                />
                              </td>
                              <td className="border border-gray-200 px-4 py-3">
                                <select
                                  value={tempStudentData.level || ''}
                                  onChange={(e) => handleStudentFieldChange('level', e.target.value)}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                  <option value="PINK">PINK</option>
                                  <option value="BLUE">BLUE</option>
                                  <option value="YELLOW">YELLOW</option>
                                  <option value="PURPLE">PURPLE</option>
                                </select>
                              </td>
                              <td className="border border-gray-200 px-4 py-3">
                                <Input
                                  value={tempStudentData.lesson || ''}
                                  onChange={(e) => handleStudentFieldChange('lesson', e.target.value)}
                                  className="w-full"
                                  placeholder="Current lesson"
                                />
                              </td>
                              <td className="border border-gray-200 px-4 py-3">
                                <Input
                                  type="number"
                                  min="0"
                                  value={tempStudentData.absence || 0}
                                  onChange={(e) => handleStudentFieldChange('absence', parseInt(e.target.value) || 0)}
                                  className="w-20"
                                />
                              </td>
                              <td className="border border-gray-200 px-4 py-3">
                                <div className="flex space-x-2">
                                  <Button
                                    size="sm"
                                    onClick={handleSaveStudent}
                                    className="bg-green-600 hover:bg-green-700 text-white"
                                  >
                                    <Save className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={handleCancelStudentEdit}
                                    className="text-red-600 border-red-300 hover:bg-red-50"
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                </div>
                              </td>
                            </>
                          ) : (
                            // Display mode
                            <>
                              <td className="border border-gray-200 px-4 py-3 font-medium">{student.name}</td>
                              <td className="border border-gray-200 px-4 py-3">{student.surname}</td>
                              <td className="border border-gray-200 px-4 py-3">
                                <Badge className={levelColors[student.level]}>{student.level}</Badge>
                              </td>
                              <td className="border border-gray-200 px-4 py-3 text-sm">{student.lesson}</td>
                              <td className="border border-gray-200 px-4 py-3">
                                <Badge className={getAbsenceColor(student.absence)}>
                                  {student.absence} {student.absence === 1 ? 'day' : 'days'}
                                </Badge>
                              </td>
                              <td className="border border-gray-200 px-4 py-3">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleEditStudent(student.id)}
                                  className="text-blue-600 border-blue-300 hover:bg-blue-50"
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </td>
                            </>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                </>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sessions" className="space-y-6">
            {/* Session Overview Boxes */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {tutorData.students?.filter(s => s.absence === 0).length || 0}
                    </div>
                    <div className="text-sm text-gray-600">Active Learners</div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {tutorData.students?.filter(s => s.level === 'PURPLE').length || 0}
                    </div>
                    <div className="text-sm text-gray-600">Advanced Level</div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">
                      {tutorData.students?.filter(s => s.level === 'PINK').length || 0}
                    </div>
                    <div className="text-sm text-gray-600">New Starters</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Learner Progress Cards */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <Target className="h-5 w-5" />
                      <span>Learner Progress & Sessions</span>
                    </CardTitle>
                    <CardDescription>
                      Track individual learner progress and start new courses for beginners
                    </CardDescription>
                  </div>
                  
                  {/* View Controls */}
                  <div className="flex items-center space-x-4">
                    {/* Sort Controls */}
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">Sort by:</span>
                      <div className="flex space-x-1">
                        <Button
                          variant={sessionsSortBy === 'name' ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => handleSessionsSort('name')}
                          className="text-xs"
                        >
                          Name
                          {sessionsSortBy === 'name' && (
                            sessionsSortOrder === 'asc' ? <ArrowUp className="h-3 w-3 ml-1" /> : <ArrowDown className="h-3 w-3 ml-1" />
                          )}
                        </Button>
                        <Button
                          variant={sessionsSortBy === 'level' ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => handleSessionsSort('level')}
                          className="text-xs"
                        >
                          Level
                          {sessionsSortBy === 'level' && (
                            sessionsSortOrder === 'asc' ? <ArrowUp className="h-3 w-3 ml-1" /> : <ArrowDown className="h-3 w-3 ml-1" />
                          )}
                        </Button>
                        <Button
                          variant={sessionsSortBy === 'progress' ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => handleSessionsSort('progress')}
                          className="text-xs"
                        >
                          Progress
                          {sessionsSortBy === 'progress' && (
                            sessionsSortOrder === 'asc' ? <ArrowUp className="h-3 w-3 ml-1" /> : <ArrowDown className="h-3 w-3 ml-1" />
                          )}
                        </Button>
                        <Button
                          variant={sessionsSortBy === 'absence' ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => handleSessionsSort('absence')}
                          className="text-xs"
                        >
                          Absence
                          {sessionsSortBy === 'absence' && (
                            sessionsSortOrder === 'asc' ? <ArrowUp className="h-3 w-3 ml-1" /> : <ArrowDown className="h-3 w-3 ml-1" />
                          )}
                        </Button>
                      </div>
                    </div>
                    
                    {/* View Toggle */}
                    <div className="flex items-center space-x-1 border rounded-md">
                      <Button
                        variant={sessionsViewMode === 'grid' ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => setSessionsViewMode('grid')}
                        className="rounded-r-none"
                      >
                        <Grid3X3 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant={sessionsViewMode === 'list' ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => setSessionsViewMode('list')}
                        className="rounded-l-none"
                      >
                        <List className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {!tutorData.students ? (
                  <div className="text-center py-8">
                    <div className="text-gray-500">Loading learners...</div>
                  </div>
                ) : (
                  <div className={
                    sessionsViewMode === 'grid' 
                      ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" 
                      : "space-y-3"
                  }>
                    {getSortedStudents(tutorData.students)?.map((student) => {
                      // Use pre-calculated progress from sorting function
                      const finalProgress = student.calculatedProgress
                      const isNewStudent = student.level === 'PINK' && finalProgress < 20

                      return sessionsViewMode === 'grid' ? (
                        // Grid View (Card Format)
                        <Card key={student.id} className="relative group hover:shadow-lg transition-shadow">
                          <CardContent className="p-4">
                            <div className="flex items-center space-x-3 mb-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                                {student.name.charAt(0)}{student.surname.charAt(0)}
                              </div>
                              <div className="flex-1">
                                <h3 className="font-semibold text-gray-900">
                                  {student.name} {student.surname}
                                </h3>
                                <div className="flex items-center space-x-2">
                                  <Badge className={levelColors[student.level]}>{student.level}</Badge>
                                  {student.absence > 0 && (
                                    <Badge className={getAbsenceColor(student.absence)}>
                                      {student.absence} absent
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="mb-3">
                              <div className="flex justify-between text-sm text-gray-600 mb-1">
                                <span>Progress</span>
                                <span>{finalProgress}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                  className={`h-2 rounded-full transition-all duration-300 ${
                                    finalProgress >= 75 ? 'bg-green-500' :
                                    finalProgress >= 50 ? 'bg-blue-500' :
                                    finalProgress >= 25 ? 'bg-yellow-500' : 'bg-red-500'
                                  }`}
                                  style={{ width: `${finalProgress}%` }}
                                ></div>
                              </div>
                            </div>

                            {/* Current Lesson */}
                            <div className="mb-4">
                              <p className="text-sm text-gray-600">Current Lesson:</p>
                              <p className="text-sm font-medium text-gray-900">{student.lesson}</p>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex space-x-2">
                              {isNewStudent ? (
                                <Button 
                                  size="sm" 
                                  className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                                  onClick={() => handleOpenStudentSession(student, true)}
                                >
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                  Start Course
                                </Button>
                              ) : (
                                <>
                                  <Button 
                                    size="sm" 
                                    variant="outline" 
                                    className="flex-1"
                                    onClick={() => handleOpenStudentSession(student, false)}
                                  >
                                    <BookOpen className="h-4 w-4 mr-2" />
                                    Continue
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    onClick={() => {
                                      alert(`Progress Report for ${student.name} ${student.surname}:\n\nLevel: ${student.level}\nProgress: ${finalProgress}%\nLessons Completed: ${Math.floor(finalProgress/10)}/10\nAbsences: ${student.absence}\nNext Milestone: ${finalProgress >= 75 ? 'Course Completion' : 'Level Advancement'}`)
                                    }}
                                  >
                                    <BarChart3 className="h-4 w-4" />
                                  </Button>
                                </>
                              )}
                            </div>

                            {/* Status Indicator */}
                            <div className="absolute top-2 right-2">
                              {isNewStudent ? (
                                <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse" title="New Student"></div>
                              ) : finalProgress >= 90 ? (
                                <div className="w-3 h-3 bg-green-500 rounded-full" title="Advanced"></div>
                              ) : finalProgress >= 50 ? (
                                <div className="w-3 h-3 bg-blue-500 rounded-full" title="Progressing"></div>
                              ) : (
                                <div className="w-3 h-3 bg-yellow-500 rounded-full" title="Needs Support"></div>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ) : (
                        // List View (Row Format)
                        <Card key={student.id} className="group hover:shadow-md transition-shadow">
                          <CardContent className="p-4">
                            <div className="flex items-center space-x-4">
                              {/* Avatar */}
                              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                                {student.name.charAt(0)}{student.surname.charAt(0)}
                              </div>
                              
                              {/* Student Info */}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center space-x-3 mb-2">
                                  <h3 className="font-semibold text-gray-900 truncate">
                                    {student.name} {student.surname}
                                  </h3>
                                  <Badge className={levelColors[student.level]}>{student.level}</Badge>
                                  {student.absence > 0 && (
                                    <Badge className={getAbsenceColor(student.absence)}>
                                      {student.absence} absent
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-sm text-gray-600 truncate">{student.lesson}</p>
                              </div>
                              
                              {/* Progress */}
                              <div className="w-32">
                                <div className="flex justify-between text-sm text-gray-600 mb-1">
                                  <span>Progress</span>
                                  <span>{finalProgress}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div 
                                    className={`h-2 rounded-full transition-all duration-300 ${
                                      finalProgress >= 75 ? 'bg-green-500' :
                                      finalProgress >= 50 ? 'bg-blue-500' :
                                      finalProgress >= 25 ? 'bg-yellow-500' : 'bg-red-500'
                                    }`}
                                    style={{ width: `${finalProgress}%` }}
                                  ></div>
                                </div>
                              </div>
                              
                              {/* Actions */}
                              <div className="flex space-x-2">
                                {isNewStudent ? (
                                  <Button 
                                    size="sm" 
                                    className="bg-green-600 hover:bg-green-700 text-white"
                                    onClick={() => handleOpenStudentSession(student, true)}
                                  >
                                    <CheckCircle className="h-4 w-4 mr-2" />
                                    Start Course
                                  </Button>
                                ) : (
                                  <>
                                    <Button 
                                      size="sm" 
                                      variant="outline"
                                      onClick={() => handleOpenStudentSession(student, false)}
                                    >
                                      <BookOpen className="h-4 w-4 mr-2" />
                                      Continue
                                    </Button>
                                    <Button 
                                      size="sm" 
                                      variant="outline"
                                      onClick={() => {
                                        alert(`Progress Report for ${student.name} ${student.surname}:\n\nLevel: ${student.level}\nProgress: ${finalProgress}%\nLessons Completed: ${Math.floor(finalProgress/10)}/10\nAbsences: ${student.absence}\nNext Milestone: ${finalProgress >= 75 ? 'Course Completion' : 'Level Advancement'}`)
                                      }}
                                    >
                                      <BarChart3 className="h-4 w-4" />
                                    </Button>
                                  </>
                                )}
                              </div>
                              
                              {/* Status Indicator */}
                              <div className="flex-shrink-0">
                                {isNewStudent ? (
                                  <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse" title="New Student"></div>
                                ) : finalProgress >= 90 ? (
                                  <div className="w-3 h-3 bg-green-500 rounded-full" title="Advanced"></div>
                                ) : finalProgress >= 50 ? (
                                  <div className="w-3 h-3 bg-blue-500 rounded-full" title="Progressing"></div>
                                ) : (
                                  <div className="w-3 h-3 bg-yellow-500 rounded-full" title="Needs Support"></div>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>
                )}
              </CardContent>
            </Card>


          </TabsContent>

          <TabsContent value="reports">
            <AITutorAgent tutorData={tutorData} />
          </TabsContent>
        </Tabs>
      </div>

      {/* Session Details Modal */}
      {selectedSession && (
        <Dialog open={isSessionModalOpen} onOpenChange={setIsSessionModalOpen}>
          <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <Badge className={gradeColors[selectedSession.grade]} variant="outline">
                      {selectedSession.grade}
                    </Badge>
                    <Badge className={levelColors[selectedSession.level]}>
                      {selectedSession.level}
                    </Badge>
                  </div>
                  <span>{selectedSession.group}</span>
                </div>
                <div className="flex items-center space-x-2">
                  {editingSession ? (
                    <>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-green-600 hover:bg-green-50"
                        onClick={handleSaveSession}
                      >
                        <Save className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-red-600 hover:bg-red-50"
                        onClick={handleCancelSessionEdit}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-blue-600 hover:bg-blue-50"
                        onClick={handleEditSession}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-red-600 hover:bg-red-50"
                        onClick={handleDeleteSession}
                      >
                        🗑️
                      </Button>
                    </>
                  )}
                </div>
              </DialogTitle>
              <DialogDescription className="flex items-center space-x-4 text-base">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>{selectedSession.time}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>{selectedSession.location}</span>
                </div>
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              {/* Lesson Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BookOpen className="h-5 w-5" />
                    <span>Lesson Details</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    {editingSession ? (
                      <Input
                        value={tempSession?.lesson?.title || ''}
                        onChange={(e) => handleLessonFieldChange('title', e.target.value)}
                        className="font-semibold text-lg"
                        placeholder="Lesson title..."
                      />
                    ) : (
                      <h4 className="font-semibold text-lg mb-2">{selectedSession.lesson.title}</h4>
                    )}
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-sm text-gray-700 mb-2 flex items-center">
                      <Target className="h-4 w-4 mr-1" />
                      Learning Objectives
                    </h5>
                    {editingSession ? (
                      <div className="space-y-2">
                        {tempSession?.lesson?.objectives?.map((objective, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <Input
                              value={objective}
                              onChange={(e) => {
                                const newObjectives = [...tempSession.lesson.objectives]
                                newObjectives[index] = e.target.value
                                handleLessonFieldChange('objectives', newObjectives)
                              }}
                              className="text-sm"
                              placeholder="Learning objective..."
                            />
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0 text-red-600 hover:bg-red-50"
                              onClick={() => {
                                const newObjectives = tempSession.lesson.objectives.filter((_, i) => i !== index)
                                handleLessonFieldChange('objectives', newObjectives)
                              }}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const newObjectives = [...(tempSession?.lesson?.objectives || []), "New objective"]
                            handleLessonFieldChange('objectives', newObjectives)
                          }}
                        >
                          + Add Objective
                        </Button>
                      </div>
                    ) : (
                      <ul className="space-y-1">
                        {selectedSession?.lesson?.objectives?.map((objective, index) => (
                          <li key={index} className="text-sm text-gray-600 flex items-start">
                            <CheckCircle className="h-3 w-3 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            {objective}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-sm text-gray-700 mb-2">Materials Needed</h5>
                    {editingSession ? (
                      <div className="space-y-2">
                        {tempSession?.lesson?.materials?.map((material, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <Input
                              value={material}
                              onChange={(e) => {
                                const newMaterials = [...tempSession.lesson.materials]
                                newMaterials[index] = e.target.value
                                handleLessonFieldChange('materials', newMaterials)
                              }}
                              className="text-sm"
                              placeholder="Material needed..."
                            />
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0 text-red-600 hover:bg-red-50"
                              onClick={() => {
                                const newMaterials = tempSession.lesson.materials.filter((_, i) => i !== index)
                                handleLessonFieldChange('materials', newMaterials)
                              }}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const newMaterials = [...(tempSession?.lesson?.materials || []), "New material"]
                            handleLessonFieldChange('materials', newMaterials)
                          }}
                        >
                          + Add Material
                        </Button>
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {selectedSession?.lesson?.materials?.map((material, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {material}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-sm text-gray-700 mb-2">Activities</h5>
                    {editingSession ? (
                      <div className="space-y-2">
                        {tempSession?.lesson?.activities?.map((activity, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <Input
                              value={activity}
                              onChange={(e) => {
                                const newActivities = [...tempSession.lesson.activities]
                                newActivities[index] = e.target.value
                                handleLessonFieldChange('activities', newActivities)
                              }}
                              className="text-sm"
                              placeholder="Activity description..."
                            />
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0 text-red-600 hover:bg-red-50"
                              onClick={() => {
                                const newActivities = tempSession.lesson.activities.filter((_, i) => i !== index)
                                handleLessonFieldChange('activities', newActivities)
                              }}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const newActivities = [...(tempSession?.lesson?.activities || []), "New activity"]
                            handleLessonFieldChange('activities', newActivities)
                          }}
                        >
                          + Add Activity
                        </Button>
                      </div>
                    ) : (
                      <ul className="space-y-1">
                        {selectedSession?.lesson?.activities?.map((activity, index) => (
                          <li key={index} className="text-sm text-gray-600">
                            • {activity}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Students List */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Users className="h-5 w-5" />
                      <span>Students ({editingSession ? tempSession?.students?.length || 0 : selectedSession.students.length})</span>
                    </div>
                    {editingSession && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleAddStudent}
                      >
                        + Add Student
                      </Button>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {(editingSession ? tempSession?.students || [] : selectedSession?.students || []).map((student, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3 flex-1">
                          <Avatar className="h-8 w-8">
                            <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-xs font-semibold">
                              {student.name?.split(' ').map(n => n[0]).join('') || 'N/A'}
                            </div>
                          </Avatar>
                          <div className="flex-1">
                            {editingSession ? (
                              <div className="space-y-2">
                                <Input
                                  value={student.name}
                                  onChange={(e) => handleStudentChange(index, 'name', e.target.value)}
                                  className="font-medium text-sm"
                                  placeholder="Student name..."
                                />
                                <div className="flex items-center space-x-2">
                                  <span className="text-xs text-gray-500 min-w-0 w-16">Progress:</span>
                                  <Input
                                    type="number"
                                    value={student.progress}
                                    onChange={(e) => handleStudentChange(index, 'progress', parseInt(e.target.value) || 0)}
                                    className="w-16 h-6 text-xs"
                                    min="0"
                                    max="100"
                                  />
                                  <span className="text-xs">%</span>
                                  <select
                                    value={student.status}
                                    onChange={(e) => handleStudentChange(index, 'status', e.target.value)}
                                    className="text-xs border rounded px-1 py-0.5"
                                  >
                                    <option value="Needs Support">Needs Support</option>
                                    <option value="On Track">On Track</option>
                                    <option value="Excellent">Excellent</option>
                                  </select>
                                </div>
                              </div>
                            ) : (
                              <div>
                                <p className="font-medium text-sm">{student.name}</p>
                                <div className="flex items-center space-x-2">
                                  <span className="text-xs text-gray-500">Progress: {student.progress}%</span>
                                  <div className="w-16 bg-gray-200 rounded-full h-1.5">
                                    <div 
                                      className="bg-blue-500 h-1.5 rounded-full transition-all duration-300"
                                      style={{ width: `${student.progress}%` }}
                                    ></div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {!editingSession && (
                            <Badge 
                              className={`${getStatusColor(student.status)} text-xs px-2 py-1`}
                              variant="outline"
                            >
                              {student.status}
                            </Badge>
                          )}
                          {editingSession && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0 text-red-600 hover:bg-red-50"
                              onClick={() => handleRemoveStudent(index)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Average Progress:</span>
                      <span className="font-medium">
                        {editingSession && tempSession?.students?.length ? 
                          Math.round(tempSession.students?.reduce((acc, student) => acc + student.progress, 0) / tempSession.students.length) :
                          selectedSession?.students?.length ? Math.round(selectedSession.students.reduce((acc, student) => acc + student.progress, 0) / selectedSession.students.length) : 0
                        }%
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-200">
              <Button variant="outline" onClick={() => setIsSessionModalOpen(false)}>
                Close
              </Button>
              <Button>
                <FileText className="h-4 w-4 mr-2" />
                View Full Report
              </Button>
              <Button onClick={handleStartSession}>
                Start Session
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Session Start Onboarding Modal */}
      {isStartingSession && selectedSession && (
        <Dialog open={isStartingSession} onOpenChange={handleCloseSessionStart}>
          <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <Badge className={gradeColors[selectedSession?.grade] || 'bg-gray-100'} variant="outline">
                    {selectedSession?.grade || 'Loading...'}
                  </Badge>
                  <Badge className={levelColors[selectedSession?.level] || 'bg-gray-100'}>
                    {selectedSession?.level || 'Loading...'}
                  </Badge>
                </div>
                <span>Start Session: {selectedSession?.group || 'Individual Session'}</span>
              </DialogTitle>
              <DialogDescription>
                {sessionOnboarding.sessionType === 'individual' && sessionOnboarding.step === 3 ? 
                  `Session Assessment - Individual assessment for ${sessionOnboarding.selectedStudents?.[0]?.name || 'student'}` :
                  `Step ${sessionOnboarding.step} of 3: ${
                    sessionOnboarding.step === 1 ? (sessionOnboarding.sessionType === 'individual' ? 'Individual Session Setup' : 'Choose Session Type') :
                    sessionOnboarding.step === 2 ? 'Select Students' :
                    'Active Session'
                  }`
                }
              </DialogDescription>
            </DialogHeader>

            {/* Step 1: Session Type Selection or Individual Session Info */}
            {sessionOnboarding.step === 1 && (
              <div className="space-y-6 mt-6">
                {sessionOnboarding.sessionType === 'individual' ? (
                  // Individual Session - Show student info instead of session type selection
                  <div className="space-y-4">
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <h3 className="text-lg font-semibold mb-3 text-green-900 flex items-center">
                        <User className="h-5 w-5 mr-2" />
                        Individual Session
                      </h3>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-green-700 font-medium">Student:</span>
                          <p className="text-green-900 font-semibold">{sessionOnboarding.selectedStudents?.[0]?.name || 'Loading...'}</p>
                        </div>
                        <div>
                          <span className="text-green-700 font-medium">Grade:</span>
                          <p className="text-green-900">{sessionOnboarding.sessionData?.grade || selectedSession?.grade || 'Loading...'}</p>
                        </div>
                        <div>
                          <span className="text-green-700 font-medium">Level:</span>
                          <Badge className={levelColors[sessionOnboarding.sessionData?.level || selectedSession?.level] || 'bg-gray-100'}>
                            {sessionOnboarding.sessionData?.level || selectedSession?.level || 'Loading...'}
                          </Badge>
                        </div>
                        <div>
                          <span className="text-green-700 font-medium">Progress:</span>
                          <p className="text-green-900">{sessionOnboarding.selectedStudents?.[0]?.progress || 0}%</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-medium text-blue-900 mb-2">
                        Lesson: {sessionOnboarding.sessionData?.lesson?.title || selectedSession?.lesson?.title || 'Loading...'}
                      </h4>
                      <div className="text-sm text-blue-800">
                        <p><strong>Objectives:</strong> {
                          sessionOnboarding.sessionData?.lesson?.objectives?.join(', ') || 
                          selectedSession?.lesson?.objectives?.join(', ') || 
                          'Loading...'
                        }</p>
                        <p className="mt-1"><strong>Materials:</strong> {
                          sessionOnboarding.sessionData?.lesson?.materials?.join(', ') || 
                          selectedSession?.lesson?.materials?.join(', ') || 
                          'Loading...'
                        }</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Group Session - Show session type selection
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Choose Session Type</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card 
                        className={`cursor-pointer transition-all ${sessionOnboarding.sessionType === 'group' ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:bg-gray-50'}`}
                        onClick={() => handleSessionTypeChange('group')}
                      >
                        <CardContent className="p-6 text-center">
                          <Users className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                          <h4 className="font-semibold mb-2">Group Session</h4>
                          <p className="text-sm text-gray-600">Teach multiple students together</p>
                        </CardContent>
                      </Card>
                      <Card 
                        className={`cursor-pointer transition-all ${sessionOnboarding.sessionType === 'individual' ? 'ring-2 ring-green-500 bg-green-50' : 'hover:bg-gray-50'}`}
                        onClick={() => handleSessionTypeChange('individual')}
                      >
                        <CardContent className="p-6 text-center">
                          <User className="h-12 w-12 mx-auto mb-4 text-green-600" />
                          <h4 className="font-semibold mb-2">Individual Session</h4>
                          <p className="text-sm text-gray-600">Focus on one student at a time</p>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg mt-4">
                      <h4 className="font-medium text-blue-900 mb-2">Lesson: {selectedSession.lesson.title}</h4>
                      <div className="text-sm text-blue-800">
                        <p><strong>Objectives:</strong> {selectedSession.lesson.objectives.join(', ')}</p>
                        <p className="mt-1"><strong>Materials:</strong> {selectedSession.lesson.materials.join(', ')}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 2: Student Selection */}
            {sessionOnboarding.step === 2 && (
              <div className="space-y-6 mt-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    Select Students for {sessionOnboarding.sessionType === 'group' ? 'Group' : 'Individual'} Session
                  </h3>
                  <div className="space-y-3">
                    {selectedSession?.students?.length > 0 ? selectedSession.students?.map((student, index) => {
                      const isSelected = sessionOnboarding.selectedStudents?.some(s => s.name === student.name) || false
                      return (
                        <div 
                          key={index} 
                          className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-all ${
                            isSelected ? 'bg-blue-50 border-blue-200' : 'bg-white hover:bg-gray-50'
                          }`}
                          onClick={() => {
                            if (sessionOnboarding.sessionType === 'individual') {
                              setSessionOnboarding(prev => ({
                                ...prev,
                                selectedStudents: [student]
                              }))
                            } else {
                              handleStudentSelection(student, !isSelected)
                            }
                          }}
                        >
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center">
                              <input
                                type={sessionOnboarding.sessionType === 'individual' ? 'radio' : 'checkbox'}
                                checked={isSelected}
                                onChange={() => {}}
                                className="mr-3"
                              />
                              <Avatar className="h-10 w-10">
                                <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-sm font-semibold">
                                  {student.name?.split(' ').map(n => n[0]).join('') || 'N/A'}
                                </div>
                              </Avatar>
                            </div>
                            <div>
                              <p className="font-medium">{student.name}</p>
                              <div className="flex items-center space-x-2">
                                <span className="text-sm text-gray-500">Current Progress: {student.progress}%</span>
                                <div className="w-20 bg-gray-200 rounded-full h-2">
                                  <div 
                                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${student.progress}%` }}
                                  ></div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <Badge 
                            className={`${getStatusColor(student.status)} text-xs`}
                            variant="outline"
                          >
                            {student.status}
                          </Badge>
                        </div>
                      )
                    }) : (
                      <div className="text-center py-8 text-gray-500">
                        No students available for this session.
                      </div>
                    )}
                  </div>
                  
                  {sessionOnboarding.selectedStudents?.length > 0 && (
                    <div className="mt-4 p-4 bg-green-50 rounded-lg">
                      <p className="font-medium text-green-900">
                        Selected: {sessionOnboarding.selectedStudents.length} student(s)
                      </p>
                      <div className="text-sm text-green-800 mt-1">
                        {sessionOnboarding.selectedStudents?.map(s => s.name).join(', ') || 'No students selected'}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 3: Active Session */}
            {sessionOnboarding.step === 3 && (
              <div className="space-y-6 mt-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Session Assessment</h3>
                  <p className="text-gray-600 mb-6">
                    {sessionOnboarding.sessionType === 'group' 
                      ? `Assess ${sessionOnboarding.selectedStudents?.length || 0} students`
                      : `Individual assessment for ${sessionOnboarding.selectedStudents?.[0]?.name || 'student'}`
                    }
                  </p>
                </div>

                {/* Session Assessment Form */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Basic Session Info */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Session Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="lesson-covered">Lesson Covered</Label>
                          <Input
                            id="lesson-covered"
                            defaultValue={selectedSession.lesson.title}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="level">Level</Label>
                          <select id="level-select" className="w-full border rounded px-3 py-2 mt-1" defaultValue={selectedSession.level}>
                            <option value="PINK">Pink level</option>
                            <option value="BLUE">Blue level</option>
                            <option value="YELLOW">Yellow level</option>
                            <option value="PURPLE">Purple level</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="rate-lesson">Rate Lesson (1-10)</Label>
                        <Input
                          id="rate-lesson"
                          type="number"
                          min="1"
                          max="10"
                          defaultValue="10"
                          className="mt-1"
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Skills Assessment */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Skills Assessment</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {[
                        'Blending',
                        'Segment', 
                        'Phoneme manipulation',
                        'Sound pattern practice',
                        'Spelling',
                        'High frequency words',
                        'Create sentences'
                      ].map((skill) => (
                        <div key={skill} className="flex items-center justify-between">
                          <Label className="text-sm">{skill}</Label>
                          <div className="flex space-x-2">
                            <label className="flex items-center">
                              <input type="radio" name={skill.toLowerCase().replace(' ', '-')} value="yes" className="mr-1" />
                              <span className="text-sm">Yes</span>
                            </label>
                            <label className="flex items-center">
                              <input type="radio" name={skill.toLowerCase().replace(' ', '-')} value="no" className="mr-1" />
                              <span className="text-sm">No</span>
                            </label>
                            <label className="flex items-center">
                              <input type="radio" name={skill.toLowerCase().replace(' ', '-')} value="na" className="mr-1" defaultChecked />
                              <span className="text-sm">N/A</span>
                            </label>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Reading Assessment */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Reading Assessment</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label className="text-sm">Paired reading</Label>
                        <div className="flex space-x-2">
                          <label className="flex items-center">
                            <input type="radio" name="paired-reading" value="yes" className="mr-1" />
                            <span className="text-sm">Yes</span>
                          </label>
                          <label className="flex items-center">
                            <input type="radio" name="paired-reading" value="no" className="mr-1" />
                            <span className="text-sm">No</span>
                          </label>
                          <label className="flex items-center">
                            <input type="radio" name="paired-reading" value="na" className="mr-1" defaultChecked />
                            <span className="text-sm">N/A</span>
                          </label>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="book-title">Title of the book</Label>
                          <Input
                            id="book-title"
                            placeholder="e.g., JACK AND THE BEANSTALK"
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="page-no">Page no.</Label>
                          <Input
                            id="page-no"
                            placeholder="e.g., Page 3"
                            className="mt-1"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Challenges & Comments */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Challenges & Observations</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="challenging-sounds">Challenging sounds</Label>
                        <Input
                          id="challenging-sounds"
                          placeholder="e.g., Z, zz, j"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="challenging-words">Challenging words</Label>
                        <Input
                          id="challenging-words"
                          placeholder="e.g., quick, duck"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="comments">Comments</Label>
                        <textarea
                          id="comments"
                          rows={4}
                          placeholder="e.g., She is advancing well. She only made a mistake on the introduction of 'T'..."
                          className="w-full border rounded px-3 py-2 mt-1 resize-none"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Student-specific assessments for group sessions */}
                {sessionOnboarding.sessionType === 'group' && sessionOnboarding.selectedStudents.length > 1 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Individual Student Notes</CardTitle>
                      <CardDescription>Add specific notes for each student if needed</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {sessionOnboarding.selectedStudents?.map((student, index) => (
                          <div key={index} className="border rounded-lg p-4">
                            <div className="flex items-center space-x-3 mb-3">
                              <Avatar className="h-8 w-8">
                                <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-xs font-semibold">
                                  {student.name?.split(' ').map(n => n[0]).join('') || 'N/A'}
                                </div>
                              </Avatar>
                              <span className="font-medium">{student.name}</span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor={`student-${index}-challenges`}>Specific Challenges</Label>
                                <Input
                                  id={`student-${index}-challenges`}
                                  placeholder="Sounds or words this student struggled with"
                                  className="mt-1"
                                />
                              </div>
                              <div>
                                <Label htmlFor={`student-${index}-progress`}>Progress Rating (1-10)</Label>
                                <Input
                                  id={`student-${index}-progress`}
                                  type="number"
                                  min="1"
                                  max="10"
                                  defaultValue="8"
                                  className="mt-1"
                                />
                              </div>
                            </div>
                            <div className="mt-3">
                              <Label htmlFor={`student-${index}-notes`}>Individual Notes</Label>
                              <textarea
                                id={`student-${index}-notes`}
                                rows={2}
                                placeholder="Specific observations for this student..."
                                className="w-full border rounded px-3 py-2 mt-1 resize-none"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Assessment Complete:</strong> Fill out the assessment form above and click "Complete Session" to save all data and update student progress.
                  </p>
                </div>
              </div>
            )}

            {/* Session Summary */}
            {sessionOnboarding.showSummary && (
              <div className="space-y-6 mt-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Session Summary</h3>
                  <p className="text-gray-600 mb-6">
                    Review the session details before finalizing
                  </p>
                </div>

                {/* Summary Table */}
                <div className="bg-white rounded-lg border overflow-hidden">
                  <div className="bg-gray-50 px-6 py-3 border-b">
                    <h4 className="font-semibold text-gray-900">Session Assessment Summary</h4>
                  </div>
                  
                  {/* Summary for each student */}
                  {sessionOnboarding.selectedStudents?.map((student, studentIndex) => (
                    <div key={studentIndex} className="border-b last:border-b-0">
                      <div className="px-6 py-4">
                        <div className="flex items-center space-x-3 mb-4">
                          <Avatar className="h-10 w-10">
                            <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-sm font-semibold">
                              {student.name?.split(' ').map(n => n[0]).join('') || 'N/A'}
                            </div>
                          </Avatar>
                          <div>
                            <h5 className="font-semibold text-lg">{student.name}</h5>
                            <p className="text-sm text-gray-600">Assessment Summary</p>
                          </div>
                        </div>

                        {/* Summary Table */}
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="bg-gray-50">
                                <th className="px-3 py-2 text-left font-medium text-gray-700 border">Field</th>
                                <th className="px-3 py-2 text-left font-medium text-gray-700 border">Value</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="px-3 py-2 border font-medium">Name</td>
                                <td className="px-3 py-2 border">{student.name?.split(' ')[0] || 'N/A'}</td>
                              </tr>
                              <tr>
                                <td className="px-3 py-2 border font-medium">Surname</td>
                                <td className="px-3 py-2 border">{student.name?.split(' ').slice(1).join(' ') || 'N/A'}</td>
                              </tr>
                              <tr>
                                <td className="px-3 py-2 border font-medium">Grade</td>
                                <td className="px-3 py-2 border">{selectedSession.grade}</td>
                              </tr>
                              <tr>
                                <td className="px-3 py-2 border font-medium">Date</td>
                                <td className="px-3 py-2 border">{sessionOnboarding.assessmentData.date}</td>
                              </tr>
                              <tr>
                                <td className="px-3 py-2 border font-medium">Start time</td>
                                <td className="px-3 py-2 border">{sessionOnboarding.assessmentData.startTime}</td>
                              </tr>
                              <tr>
                                <td className="px-3 py-2 border font-medium">Finish time</td>
                                <td className="px-3 py-2 border">{sessionOnboarding.assessmentData.finishTime}</td>
                              </tr>
                              <tr>
                                <td className="px-3 py-2 border font-medium">Page number : Phonographix</td>
                                <td className="px-3 py-2 border">{sessionOnboarding.assessmentData.pageNo}</td>
                              </tr>
                              <tr>
                                <td className="px-3 py-2 border font-medium">Lesson covered</td>
                                <td className="px-3 py-2 border">{sessionOnboarding.assessmentData.lessonCovered}</td>
                              </tr>
                              <tr>
                                <td className="px-3 py-2 border font-medium">Level</td>
                                <td className="px-3 py-2 border">{sessionOnboarding.assessmentData.level}</td>
                              </tr>
                              <tr>
                                <td className="px-3 py-2 border font-medium">Rate lesson</td>
                                <td className="px-3 py-2 border">{sessionOnboarding.assessmentData.rateLesson}/10</td>
                              </tr>
                              <tr>
                                <td className="px-3 py-2 border font-medium">Blending</td>
                                <td className="px-3 py-2 border">
                                  <Badge className={sessionOnboarding.assessmentData.blending === 'yes' ? 'bg-green-100 text-green-800' : sessionOnboarding.assessmentData.blending === 'no' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}>
                                    {sessionOnboarding.assessmentData.blending?.toUpperCase()}
                                  </Badge>
                                </td>
                              </tr>
                              <tr>
                                <td className="px-3 py-2 border font-medium">Segment</td>
                                <td className="px-3 py-2 border">
                                  <Badge className={sessionOnboarding.assessmentData.segment === 'yes' ? 'bg-green-100 text-green-800' : sessionOnboarding.assessmentData.segment === 'no' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}>
                                    {sessionOnboarding.assessmentData.segment?.toUpperCase()}
                                  </Badge>
                                </td>
                              </tr>
                              <tr>
                                <td className="px-3 py-2 border font-medium">Phoneme manipulation</td>
                                <td className="px-3 py-2 border">
                                  <Badge className={sessionOnboarding.assessmentData.phonemeManipulation === 'yes' ? 'bg-green-100 text-green-800' : sessionOnboarding.assessmentData.phonemeManipulation === 'no' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}>
                                    {sessionOnboarding.assessmentData.phonemeManipulation?.toUpperCase()}
                                  </Badge>
                                </td>
                              </tr>
                              <tr>
                                <td className="px-3 py-2 border font-medium">Sound pattern practice</td>
                                <td className="px-3 py-2 border">
                                  <Badge className={sessionOnboarding.assessmentData.soundPatternPractice === 'yes' ? 'bg-green-100 text-green-800' : sessionOnboarding.assessmentData.soundPatternPractice === 'no' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}>
                                    {sessionOnboarding.assessmentData.soundPatternPractice?.toUpperCase()}
                                  </Badge>
                                </td>
                              </tr>
                              <tr>
                                <td className="px-3 py-2 border font-medium">Spelling</td>
                                <td className="px-3 py-2 border">
                                  <Badge className={sessionOnboarding.assessmentData.spelling === 'yes' ? 'bg-green-100 text-green-800' : sessionOnboarding.assessmentData.spelling === 'no' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}>
                                    {sessionOnboarding.assessmentData.spelling?.toUpperCase()}
                                  </Badge>
                                </td>
                              </tr>
                              <tr>
                                <td className="px-3 py-2 border font-medium">High frequency words</td>
                                <td className="px-3 py-2 border">
                                  <Badge className={sessionOnboarding.assessmentData.highFrequencyWords === 'yes' ? 'bg-green-100 text-green-800' : sessionOnboarding.assessmentData.highFrequencyWords === 'no' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}>
                                    {sessionOnboarding.assessmentData.highFrequencyWords?.toUpperCase()}
                                  </Badge>
                                </td>
                              </tr>
                              <tr>
                                <td className="px-3 py-2 border font-medium">Create sentences</td>
                                <td className="px-3 py-2 border">
                                  <Badge className={sessionOnboarding.assessmentData.createSentences === 'yes' ? 'bg-green-100 text-green-800' : sessionOnboarding.assessmentData.createSentences === 'no' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}>
                                    {sessionOnboarding.assessmentData.createSentences?.toUpperCase()}
                                  </Badge>
                                </td>
                              </tr>
                              <tr>
                                <td className="px-3 py-2 border font-medium">Paired reading</td>
                                <td className="px-3 py-2 border">
                                  <Badge className={sessionOnboarding.assessmentData.pairedReading === 'yes' ? 'bg-green-100 text-green-800' : sessionOnboarding.assessmentData.pairedReading === 'no' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}>
                                    {sessionOnboarding.assessmentData.pairedReading?.toUpperCase()}
                                  </Badge>
                                </td>
                              </tr>
                              <tr>
                                <td className="px-3 py-2 border font-medium">Book title</td>
                                <td className="px-3 py-2 border">{sessionOnboarding.assessmentData.bookTitle}</td>
                              </tr>
                              <tr>
                                <td className="px-3 py-2 border font-medium">Challenging sounds</td>
                                <td className="px-3 py-2 border">{sessionOnboarding.assessmentData.challengingSounds}</td>
                              </tr>
                              <tr>
                                <td className="px-3 py-2 border font-medium">Challenging words</td>
                                <td className="px-3 py-2 border">{sessionOnboarding.assessmentData.challengingWords}</td>
                              </tr>
                              <tr>
                                <td className="px-3 py-2 border font-medium">Comments</td>
                                <td className="px-3 py-2 border">{sessionOnboarding.assessmentData.comments || 'No additional comments'}</td>
                              </tr>
                              {sessionOnboarding.assessmentData.studentNotes?.[studentIndex] && (
                                <>
                                  <tr>
                                    <td className="px-3 py-2 border font-medium">Individual Progress Rating</td>
                                    <td className="px-3 py-2 border">
                                      {editingSummaryFields[`${studentIndex}-progressRating`] ? (
                                        <div className="flex items-center space-x-2">
                                          <Input
                                            type="number"
                                            min="1"
                                            max="10"
                                            value={tempSummaryData[`${studentIndex}-progressRating`] || ''}
                                            onChange={(e) => handleSummaryFieldChange(studentIndex, 'progressRating', e.target.value)}
                                            className="w-16 h-6 text-sm"
                                          />
                                          <span className="text-sm">/10</span>
                                          <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-5 w-5 p-0 text-green-600 hover:bg-green-50"
                                            onClick={() => handleSaveSummaryField(studentIndex, 'progressRating')}
                                          >
                                            <Save className="h-3 w-3" />
                                          </Button>
                                          <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-5 w-5 p-0 text-red-600 hover:bg-red-50"
                                            onClick={() => handleCancelSummaryEdit(studentIndex, 'progressRating')}
                                          >
                                            <X className="h-3 w-3" />
                                          </Button>
                                        </div>
                                      ) : (
                                        <div className="flex items-center justify-between group">
                                          <span>{sessionOnboarding.assessmentData.studentNotes?.[studentIndex]?.progressRating || 8}/10</span>
                                          <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-5 w-5 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                            onClick={() => handleEditSummaryField(studentIndex, 'progressRating')}
                                          >
                                            <Edit className="h-3 w-3" />
                                          </Button>
                                        </div>
                                      )}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="px-3 py-2 border font-medium">Specific Challenges</td>
                                    <td className="px-3 py-2 border">
                                      {editingSummaryFields[`${studentIndex}-specificChallenges`] ? (
                                        <div className="flex items-center space-x-2">
                                          <Input
                                            type="text"
                                            value={tempSummaryData[`${studentIndex}-specificChallenges`] || ''}
                                            onChange={(e) => handleSummaryFieldChange(studentIndex, 'specificChallenges', e.target.value)}
                                            className="flex-1 h-6 text-sm"
                                            placeholder="Enter specific challenges..."
                                          />
                                          <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-5 w-5 p-0 text-green-600 hover:bg-green-50"
                                            onClick={() => handleSaveSummaryField(studentIndex, 'specificChallenges')}
                                          >
                                            <Save className="h-3 w-3" />
                                          </Button>
                                          <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-5 w-5 p-0 text-red-600 hover:bg-red-50"
                                            onClick={() => handleCancelSummaryEdit(studentIndex, 'specificChallenges')}
                                          >
                                            <X className="h-3 w-3" />
                                          </Button>
                                        </div>
                                      ) : (
                                        <div className="flex items-center justify-between group">
                                          <span>{sessionOnboarding.assessmentData.studentNotes?.[studentIndex]?.specificChallenges || 'None noted'}</span>
                                          <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-5 w-5 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                            onClick={() => handleEditSummaryField(studentIndex, 'specificChallenges')}
                                          >
                                            <Edit className="h-3 w-3" />
                                          </Button>
                                        </div>
                                      )}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="px-3 py-2 border font-medium">Individual Notes</td>
                                    <td className="px-3 py-2 border">
                                      {editingSummaryFields[`${studentIndex}-individualNotes`] ? (
                                        <div className="flex items-center space-x-2">
                                          <textarea
                                            value={tempSummaryData[`${studentIndex}-individualNotes`] || ''}
                                            onChange={(e) => handleSummaryFieldChange(studentIndex, 'individualNotes', e.target.value)}
                                            className="flex-1 border rounded px-2 py-1 text-sm resize-none"
                                            rows={2}
                                            placeholder="Enter individual notes..."
                                          />
                                          <div className="flex flex-col space-y-1">
                                            <Button
                                              variant="ghost"
                                              size="sm"
                                              className="h-5 w-5 p-0 text-green-600 hover:bg-green-50"
                                              onClick={() => handleSaveSummaryField(studentIndex, 'individualNotes')}
                                            >
                                              <Save className="h-3 w-3" />
                                            </Button>
                                            <Button
                                              variant="ghost"
                                              size="sm"
                                              className="h-5 w-5 p-0 text-red-600 hover:bg-red-50"
                                              onClick={() => handleCancelSummaryEdit(studentIndex, 'individualNotes')}
                                            >
                                              <X className="h-3 w-3" />
                                            </Button>
                                          </div>
                                        </div>
                                      ) : (
                                        <div className="flex items-center justify-between group">
                                          <span>{sessionOnboarding.assessmentData.studentNotes?.[studentIndex]?.individualNotes || 'No individual notes'}</span>
                                          <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-5 w-5 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                            onClick={() => handleEditSummaryField(studentIndex, 'individualNotes')}
                                          >
                                            <Edit className="h-3 w-3" />
                                          </Button>
                                        </div>
                                      )}
                                    </td>
                                  </tr>
                                </>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-green-800">
                    <strong>Ready to finalize:</strong> Review the summary above and click "Finalize Session" to save all data and update student progress.
                  </p>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-6 pt-4 border-t border-gray-200">
              <div>
                {sessionOnboarding.step > 1 && sessionOnboarding.step < 3 && !sessionOnboarding.showSummary && (
                  <Button variant="outline" onClick={handlePreviousStep}>
                    Previous
                  </Button>
                )}
                {sessionOnboarding.showSummary && (
                  <Button variant="outline" onClick={handleBackToAssessment}>
                    Back to Assessment
                  </Button>
                )}
              </div>
              <div className="flex space-x-3">
                <Button variant="outline" onClick={handleCloseSessionStart}>
                  {sessionOnboarding.step === 3 || sessionOnboarding.showSummary ? 'Minimize' : 'Cancel'}
                </Button>
                {sessionOnboarding.step === 1 && (
                  <Button onClick={handleNextStep}>
                    Continue
                  </Button>
                )}
                {sessionOnboarding.step === 2 && sessionOnboarding.selectedStudents.length > 0 && (
                  <Button onClick={handleNextStep}>
                    Start Session
                  </Button>
                )}
                {sessionOnboarding.step === 3 && !sessionOnboarding.showSummary && (
                  <Button onClick={handleCompleteSession} className="bg-blue-600 hover:bg-blue-700">
                    Complete Session
                  </Button>
                )}
                {sessionOnboarding.showSummary && (
                  <Button onClick={handleFinalizeSession} className="bg-green-600 hover:bg-green-700">
                    Finalize Session
                  </Button>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Timetable Settings Modal */}
      {isTimetableSettingsOpen && (
        <Dialog open={isTimetableSettingsOpen} onOpenChange={handleCloseTimetableSettings}>
          <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>Timetable Settings</span>
              </DialogTitle>
              <DialogDescription>
                Manage your weekly timetable - add classes, delete time slots, or manage days
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 mt-6">
              {/* Action Selection */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Choose Action</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card 
                    className={`cursor-pointer transition-all ${timetableSettings.action === 'add' ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:bg-gray-50'}`}
                    onClick={() => handleTimetableActionChange('add')}
                  >
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl mb-2">➕</div>
                      <h4 className="font-semibold mb-1">Add Class</h4>
                      <p className="text-xs text-gray-600">Add new time slot</p>
                    </CardContent>
                  </Card>
                  <Card 
                    className={`cursor-pointer transition-all ${timetableSettings.action === 'addDay' ? 'ring-2 ring-green-500 bg-green-50' : 'hover:bg-gray-50'}`}
                    onClick={() => handleTimetableActionChange('addDay')}
                  >
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl mb-2">📅</div>
                      <h4 className="font-semibold mb-1">Add Day</h4>
                      <p className="text-xs text-gray-600">Add new day</p>
                    </CardContent>
                  </Card>
                  <Card 
                    className={`cursor-pointer transition-all ${timetableSettings.action === 'deleteDay' ? 'ring-2 ring-red-500 bg-red-50' : 'hover:bg-gray-50'}`}
                    onClick={() => handleTimetableActionChange('deleteDay')}
                  >
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl mb-2">🗑️</div>
                      <h4 className="font-semibold mb-1">Delete Day</h4>
                      <p className="text-xs text-gray-600">Remove entire day</p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Add Class Form */}
              {timetableSettings.action === 'add' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Add New Class</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="day-select">Select Day</Label>
                      <select
                        id="day-select"
                        value={timetableSettings.selectedDay}
                        onChange={(e) => setTimetableSettings(prev => ({ ...prev, selectedDay: e.target.value }))}
                        className="w-full border rounded px-3 py-2 mt-1"
                      >
                        {Object.keys(tutorData.timetable || {}).map(day => (
                          <option key={day} value={day}>{day}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <Label htmlFor="time-input">Time Slot</Label>
                      <Input
                        id="time-input"
                        type="text"
                        placeholder="e.g., 14:00 - 14:30"
                        value={timetableSettings.newTimeSlot.time}
                        onChange={(e) => handleTimetableFieldChange('time', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="class-input">Class Name</Label>
                      <Input
                        id="class-input"
                        type="text"
                        placeholder="e.g., 3A (Apple Group 1)"
                        value={timetableSettings.newTimeSlot.class}
                        onChange={(e) => handleTimetableFieldChange('class', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="grade-input">Grade (Optional)</Label>
                      <Input
                        id="grade-input"
                        type="text"
                        placeholder="e.g., 3A"
                        value={timetableSettings.newTimeSlot.grade}
                        onChange={(e) => handleTimetableFieldChange('grade', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="level-select">Phono-Graphix Level</Label>
                      <select
                        id="level-select"
                        value={timetableSettings.newTimeSlot.level}
                        onChange={(e) => handleTimetableFieldChange('level', e.target.value)}
                        className="w-full border rounded px-3 py-2 mt-1"
                      >
                        <option value="PINK">PINK</option>
                        <option value="BLUE">BLUE</option>
                        <option value="YELLOW">YELLOW</option>
                        <option value="PURPLE">PURPLE</option>
                      </select>
                    </div>
                    
                    <div>
                      <Label htmlFor="location-input">Location</Label>
                      <Input
                        id="location-input"
                        type="text"
                        placeholder="e.g., Room 101"
                        value={timetableSettings.newTimeSlot.location}
                        onChange={(e) => handleTimetableFieldChange('location', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Note:</strong> If you provide a grade, this will create a detailed session with lesson planning capabilities. 
                      Otherwise, it will create a simple time slot.
                    </p>
                  </div>
                </div>
              )}

              {/* Add Day Section */}
              {timetableSettings.action === 'addDay' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Add New Day</h3>
                  <p className="text-gray-600">
                    Click the button below to add a new day to your timetable. You'll be prompted to enter the day name.
                  </p>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-sm text-green-800">
                      <strong>Template:</strong> New days will be created with a standard template including morning sessions, 
                      lunch break, afternoon sessions, and admin time.
                    </p>
                  </div>
                </div>
              )}

              {/* Delete Day Section */}
              {timetableSettings.action === 'deleteDay' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Delete Day</h3>
                  <p className="text-gray-600">
                    Select a day to delete. This will permanently remove the day and all its time slots.
                  </p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {Object.keys(tutorData.timetable || {}).map(day => (
                      <Card 
                        key={day}
                        className="cursor-pointer hover:bg-red-50 border-red-200 transition-all"
                        onClick={() => handleDeleteDay(day)}
                      >
                        <CardContent className="p-4 text-center">
                          <div className="text-red-600 mb-2">🗑️</div>
                          <p className="font-medium text-sm">{day}</p>
                          <p className="text-xs text-gray-500">
                            {tutorData.timetable?.[day]?.length || 0} slots
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  
                  <div className="bg-red-50 p-4 rounded-lg">
                    <p className="text-sm text-red-800">
                      <strong>Warning:</strong> Deleting a day will permanently remove all time slots and cannot be undone. 
                      You must have at least one day remaining.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-200">
              <Button variant="outline" onClick={handleCloseTimetableSettings}>
                Close
              </Button>
              {timetableSettings.action === 'add' && (
                <Button onClick={handleAddTimeSlot} className="bg-blue-600 hover:bg-blue-700">
                  Add Time Slot
                </Button>
              )}
              {timetableSettings.action === 'addDay' && (
                <Button onClick={handleAddNewDay} className="bg-green-600 hover:bg-green-700">
                  Add New Day
                </Button>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Student Session Modal */}
      {isStudentSessionModalOpen && selectedStudentForSession && (
        <Dialog open={isStudentSessionModalOpen} onOpenChange={handleCloseStudentSession}>
          <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-lg font-semibold">
                  {selectedStudentForSession.name.charAt(0)}{selectedStudentForSession.surname.charAt(0)}
                </div>
                <div>
                  <div className="text-xl font-semibold">
                    {selectedStudentForSession.name} {selectedStudentForSession.surname}
                  </div>
                  <div className="text-sm text-gray-600 font-normal">
                    {selectedStudentForSession.isNewCourse ? 'New Course Setup' : 'Continue Learning'}
                  </div>
                </div>
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-6 mt-6">
              {/* Student Overview */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold mb-3 flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  Student Overview
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Current Level</p>
                    <Badge className={levelColors[selectedStudentForSession.level]} size="lg">
                      {selectedStudentForSession.level}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Progress</p>
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            selectedStudentForSession.progress >= 75 ? 'bg-green-500' :
                            selectedStudentForSession.progress >= 50 ? 'bg-blue-500' :
                            selectedStudentForSession.progress >= 25 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${selectedStudentForSession.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{selectedStudentForSession.progress}%</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Sessions Completed</p>
                    <p className="font-semibold">{selectedStudentForSession.sessionsCompleted}/{selectedStudentForSession.totalSessions}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Attendance</p>
                    <Badge className={getAbsenceColor(selectedStudentForSession.absence)}>
                      {selectedStudentForSession.absence === 0 ? 'Perfect' : `${selectedStudentForSession.absence} absences`}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Current Lesson */}
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-semibold mb-3 flex items-center">
                  <BookOpen className="h-4 w-4 mr-2" />
                  {selectedStudentForSession.isNewCourse ? 'Starting Lesson' : 'Current Lesson'}
                </h3>
                <div className="space-y-2">
                  <p className="font-medium">{selectedStudentForSession.lesson}</p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Last Session</p>
                      <p className="font-medium">{selectedStudentForSession.lastSession}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Next Milestone</p>
                      <p className="font-medium">{selectedStudentForSession.nextMilestone}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Learning Assessment */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold mb-2 flex items-center text-green-800">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Strengths
                  </h4>
                  <ul className="space-y-1">
                    {selectedStudentForSession.strengths?.map((strength, index) => (
                      <li key={index} className="text-sm flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        {strength}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-orange-50 rounded-lg p-4">
                  <h4 className="font-semibold mb-2 flex items-center text-orange-800">
                    <Target className="h-4 w-4 mr-2" />
                    Focus Areas
                  </h4>
                  <ul className="space-y-1">
                    {selectedStudentForSession.challenges?.map((challenge, index) => (
                      <li key={index} className="text-sm flex items-center">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                        {challenge}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Session Plan */}
              <div className="bg-purple-50 rounded-lg p-4">
                <h3 className="font-semibold mb-3 flex items-center text-purple-800">
                  <Clock className="h-4 w-4 mr-2" />
                  {selectedStudentForSession.isNewCourse ? 'Course Plan' : 'Session Plan'}
                </h3>
                <div className="space-y-2">
                  {selectedStudentForSession.isNewCourse ? (
                    <>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Course Duration:</span>
                        <span className="text-sm font-medium">4 weeks</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Sessions per Week:</span>
                        <span className="text-sm font-medium">3 sessions</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">First Focus:</span>
                        <span className="text-sm font-medium">Letter-Sound Correspondence</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Session Duration:</span>
                        <span className="text-sm font-medium">30 minutes</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Estimated Completion:</span>
                        <span className="text-sm font-medium">{selectedStudentForSession.estimatedCompletion}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Today's Focus:</span>
                        <span className="text-sm font-medium">{selectedStudentForSession.challenges[0]}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3 pt-4 border-t">
                <Button variant="outline" onClick={handleCloseStudentSession} className="flex-1">
                  Cancel
                </Button>
                <Button 
                  onClick={handleStartIndividualSession}
                  className={`flex-1 ${selectedStudentForSession.isNewCourse ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
                >
                  {selectedStudentForSession.isNewCourse ? (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Start Course
                    </>
                  ) : (
                    <>
                      <BookOpen className="h-4 w-4 mr-2" />
                      Continue Session
                    </>
                  )}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}