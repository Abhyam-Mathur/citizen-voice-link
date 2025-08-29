export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      cities: {
        Row: {
          created_at: string | null
          id: string
          name: string
          state_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          state_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          state_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cities_state_id_fkey"
            columns: ["state_id"]
            isOneToOne: false
            referencedRelation: "states"
            referencedColumns: ["id"]
          },
        ]
      }
      complaint_updates: {
        Row: {
          complaint_id: string | null
          created_at: string | null
          id: string
          media_urls: string[] | null
          new_status: Database["public"]["Enums"]["issue_status"]
          notes: string | null
          old_status: Database["public"]["Enums"]["issue_status"] | null
          updated_by: string | null
        }
        Insert: {
          complaint_id?: string | null
          created_at?: string | null
          id?: string
          media_urls?: string[] | null
          new_status: Database["public"]["Enums"]["issue_status"]
          notes?: string | null
          old_status?: Database["public"]["Enums"]["issue_status"] | null
          updated_by?: string | null
        }
        Update: {
          complaint_id?: string | null
          created_at?: string | null
          id?: string
          media_urls?: string[] | null
          new_status?: Database["public"]["Enums"]["issue_status"]
          notes?: string | null
          old_status?: Database["public"]["Enums"]["issue_status"] | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "complaint_updates_complaint_id_fkey"
            columns: ["complaint_id"]
            isOneToOne: false
            referencedRelation: "complaints"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "complaint_updates_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      complaints: {
        Row: {
          assigned_at: string | null
          assigned_to: string | null
          city_id: string | null
          created_at: string | null
          description: string
          id: string
          issue_type: Database["public"]["Enums"]["issue_type"]
          latitude: number | null
          longitude: number | null
          media_urls: string[] | null
          priority: number | null
          resolved_at: string | null
          state_id: string | null
          status: Database["public"]["Enums"]["issue_status"] | null
          title: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          assigned_at?: string | null
          assigned_to?: string | null
          city_id?: string | null
          created_at?: string | null
          description: string
          id?: string
          issue_type: Database["public"]["Enums"]["issue_type"]
          latitude?: number | null
          longitude?: number | null
          media_urls?: string[] | null
          priority?: number | null
          resolved_at?: string | null
          state_id?: string | null
          status?: Database["public"]["Enums"]["issue_status"] | null
          title: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          assigned_at?: string | null
          assigned_to?: string | null
          city_id?: string | null
          created_at?: string | null
          description?: string
          id?: string
          issue_type?: Database["public"]["Enums"]["issue_type"]
          latitude?: number | null
          longitude?: number | null
          media_urls?: string[] | null
          priority?: number | null
          resolved_at?: string | null
          state_id?: string | null
          status?: Database["public"]["Enums"]["issue_status"] | null
          title?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "complaints_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "complaints_city_id_fkey"
            columns: ["city_id"]
            isOneToOne: false
            referencedRelation: "cities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "complaints_state_id_fkey"
            columns: ["state_id"]
            isOneToOne: false
            referencedRelation: "states"
            referencedColumns: ["id"]
          },
        ]
      }
      feedback: {
        Row: {
          comment: string | null
          complaint_id: string | null
          created_at: string | null
          id: string
          is_resolved: boolean | null
          rating: number | null
          user_id: string | null
        }
        Insert: {
          comment?: string | null
          complaint_id?: string | null
          created_at?: string | null
          id?: string
          is_resolved?: boolean | null
          rating?: number | null
          user_id?: string | null
        }
        Update: {
          comment?: string | null
          complaint_id?: string | null
          created_at?: string | null
          id?: string
          is_resolved?: boolean | null
          rating?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "feedback_complaint_id_fkey"
            columns: ["complaint_id"]
            isOneToOne: false
            referencedRelation: "complaints"
            referencedColumns: ["id"]
          },
        ]
      }
      helpline_numbers: {
        Row: {
          city_id: string | null
          contact_number: string
          created_at: string | null
          department: string
          description: string | null
          id: string
        }
        Insert: {
          city_id?: string | null
          contact_number: string
          created_at?: string | null
          department: string
          description?: string | null
          id?: string
        }
        Update: {
          city_id?: string | null
          contact_number?: string
          created_at?: string | null
          department?: string
          description?: string | null
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "helpline_numbers_city_id_fkey"
            columns: ["city_id"]
            isOneToOne: false
            referencedRelation: "cities"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          anonymous_username: string | null
          created_at: string | null
          department: string | null
          full_name: string | null
          id: string
          phone_number: string | null
          role: Database["public"]["Enums"]["user_role"] | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          anonymous_username?: string | null
          created_at?: string | null
          department?: string | null
          full_name?: string | null
          id?: string
          phone_number?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          anonymous_username?: string | null
          created_at?: string | null
          department?: string | null
          full_name?: string | null
          id?: string
          phone_number?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      states: {
        Row: {
          code: string
          created_at: string | null
          id: string
          name: string
        }
        Insert: {
          code: string
          created_at?: string | null
          id?: string
          name: string
        }
        Update: {
          code?: string
          created_at?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_anonymous_username: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      issue_status: "registered" | "assigned" | "in_progress" | "resolved"
      issue_type: "street_light" | "pothole" | "garbage" | "drainage" | "others"
      user_role: "citizen" | "admin" | "field_officer"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      issue_status: ["registered", "assigned", "in_progress", "resolved"],
      issue_type: ["street_light", "pothole", "garbage", "drainage", "others"],
      user_role: ["citizen", "admin", "field_officer"],
    },
  },
} as const
