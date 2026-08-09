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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      audit_logs: {
        Row: {
          action: string
          created_at: string
          id: string
          ip_address: unknown
          metadata: Json | null
          resource_id: string | null
          resource_type: string
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string
          id?: string
          ip_address?: unknown
          metadata?: Json | null
          resource_id?: string | null
          resource_type: string
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string
          id?: string
          ip_address?: unknown
          metadata?: Json | null
          resource_id?: string | null
          resource_type?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      donations: {
        Row: {
          amount_cents: number
          created_at: string
          currency: string
          donor_id: string | null
          id: string
          is_anonymous: boolean
          message: string | null
          payment_provider: string | null
          payment_reference: string | null
          status: string
        }
        Insert: {
          amount_cents: number
          created_at?: string
          currency?: string
          donor_id?: string | null
          id?: string
          is_anonymous?: boolean
          message?: string | null
          payment_provider?: string | null
          payment_reference?: string | null
          status?: string
        }
        Update: {
          amount_cents?: number
          created_at?: string
          currency?: string
          donor_id?: string | null
          id?: string
          is_anonymous?: boolean
          message?: string | null
          payment_provider?: string | null
          payment_reference?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "donations_donor_id_fkey"
            columns: ["donor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      event_contacts: {
        Row: {
          event_id: string
          id: string
          label: string | null
          type: string
          value: string
        }
        Insert: {
          event_id: string
          id?: string
          label?: string | null
          type: string
          value: string
        }
        Update: {
          event_id?: string
          id?: string
          label?: string | null
          type?: string
          value?: string
        }
        Relationships: [
          {
            foreignKeyName: "event_contacts_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      event_dates: {
        Row: {
          date: string
          end_time: string
          event_id: string
          id: string
          label: string | null
          order: number
          start_time: string
        }
        Insert: {
          date: string
          end_time: string
          event_id: string
          id?: string
          label?: string | null
          order?: number
          start_time: string
        }
        Update: {
          date?: string
          end_time?: string
          event_id?: string
          id?: string
          label?: string | null
          order?: number
          start_time?: string
        }
        Relationships: [
          {
            foreignKeyName: "event_dates_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      event_partners: {
        Row: {
          event_id: string
          id: string
          logo_media_id: string | null
          name: string
          order: number
        }
        Insert: {
          event_id: string
          id?: string
          logo_media_id?: string | null
          name: string
          order?: number
        }
        Update: {
          event_id?: string
          id?: string
          logo_media_id?: string | null
          name?: string
          order?: number
        }
        Relationships: [
          {
            foreignKeyName: "event_partners_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_partners_logo_media_id_fkey"
            columns: ["logo_media_id"]
            isOneToOne: false
            referencedRelation: "media"
            referencedColumns: ["id"]
          },
        ]
      }
      event_schedule: {
        Row: {
          event_id: string
          id: string
          order: number
        }
        Insert: {
          event_id: string
          id?: string
          order?: number
        }
        Update: {
          event_id?: string
          id?: string
          order?: number
        }
        Relationships: [
          {
            foreignKeyName: "event_schedule_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      event_schedule_translations: {
        Row: {
          description: string | null
          id: string
          locale: string
          part_label: string
          schedule_id: string
          time_range: string
          title: string
        }
        Insert: {
          description?: string | null
          id?: string
          locale: string
          part_label: string
          schedule_id: string
          time_range: string
          title: string
        }
        Update: {
          description?: string | null
          id?: string
          locale?: string
          part_label?: string
          schedule_id?: string
          time_range?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "event_schedule_translations_schedule_id_fkey"
            columns: ["schedule_id"]
            isOneToOne: false
            referencedRelation: "event_schedule"
            referencedColumns: ["id"]
          },
        ]
      }
      event_translations: {
        Row: {
          description: string
          event_id: string
          id: string
          locale: string
          location_address: string | null
          location_name: string | null
          theme: string | null
          title: string
        }
        Insert: {
          description: string
          event_id: string
          id?: string
          locale: string
          location_address?: string | null
          location_name?: string | null
          theme?: string | null
          title: string
        }
        Update: {
          description?: string
          event_id?: string
          id?: string
          locale?: string
          location_address?: string | null
          location_name?: string | null
          theme?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "event_translations_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          created_at: string
          created_by: string | null
          id: string
          is_free: boolean
          is_online: boolean
          is_published: boolean
          registration_url: string | null
          slug: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          id?: string
          is_free?: boolean
          is_online?: boolean
          is_published?: boolean
          registration_url?: string | null
          slug: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          id?: string
          is_free?: boolean
          is_online?: boolean
          is_published?: boolean
          registration_url?: string | null
          slug?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "events_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      gallery_media: {
        Row: {
          alt: string | null
          caption: string | null
          created_at: string
          duration_seconds: number | null
          format: string | null
          height: number | null
          id: string
          is_published: boolean
          provider: string
          related_event_id: string | null
          related_past_event_id: string | null
          related_project_id: string | null
          storage_ref: string
          type: string
          uploaded_by: string | null
          width: number | null
        }
        Insert: {
          alt?: string | null
          caption?: string | null
          created_at?: string
          duration_seconds?: number | null
          format?: string | null
          height?: number | null
          id?: string
          is_published?: boolean
          provider?: string
          related_event_id?: string | null
          related_past_event_id?: string | null
          related_project_id?: string | null
          storage_ref: string
          type: string
          uploaded_by?: string | null
          width?: number | null
        }
        Update: {
          alt?: string | null
          caption?: string | null
          created_at?: string
          duration_seconds?: number | null
          format?: string | null
          height?: number | null
          id?: string
          is_published?: boolean
          provider?: string
          related_event_id?: string | null
          related_past_event_id?: string | null
          related_project_id?: string | null
          storage_ref?: string
          type?: string
          uploaded_by?: string | null
          width?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "gallery_media_related_event_id_fkey"
            columns: ["related_event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "gallery_media_related_past_event_id_fkey"
            columns: ["related_past_event_id"]
            isOneToOne: false
            referencedRelation: "past_events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "gallery_media_related_project_id_fkey"
            columns: ["related_project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "gallery_media_uploaded_by_fkey"
            columns: ["uploaded_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      media: {
        Row: {
          alt: string | null
          caption: string | null
          created_at: string
          duration_seconds: number | null
          format: string | null
          height: number | null
          id: string
          is_cover: boolean
          order: number
          owner_id: string
          owner_type: string
          provider: string
          storage_ref: string
          type: string
          uploaded_by: string | null
          width: number | null
        }
        Insert: {
          alt?: string | null
          caption?: string | null
          created_at?: string
          duration_seconds?: number | null
          format?: string | null
          height?: number | null
          id?: string
          is_cover?: boolean
          order?: number
          owner_id: string
          owner_type: string
          provider?: string
          storage_ref: string
          type: string
          uploaded_by?: string | null
          width?: number | null
        }
        Update: {
          alt?: string | null
          caption?: string | null
          created_at?: string
          duration_seconds?: number | null
          format?: string | null
          height?: number | null
          id?: string
          is_cover?: boolean
          order?: number
          owner_id?: string
          owner_type?: string
          provider?: string
          storage_ref?: string
          type?: string
          uploaded_by?: string | null
          width?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "media_uploaded_by_fkey"
            columns: ["uploaded_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      news_articles: {
        Row: {
          author_id: string | null
          created_at: string
          id: string
          is_published: boolean
          published_at: string | null
          slug: string
          updated_at: string
        }
        Insert: {
          author_id?: string | null
          created_at?: string
          id?: string
          is_published?: boolean
          published_at?: string | null
          slug: string
          updated_at?: string
        }
        Update: {
          author_id?: string | null
          created_at?: string
          id?: string
          is_published?: boolean
          published_at?: string | null
          slug?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "news_articles_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      news_translations: {
        Row: {
          article_id: string
          body: string
          excerpt: string
          id: string
          locale: string
          title: string
        }
        Insert: {
          article_id: string
          body: string
          excerpt: string
          id?: string
          locale: string
          title: string
        }
        Update: {
          article_id?: string
          body?: string
          excerpt?: string
          id?: string
          locale?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "news_translations_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "news_articles"
            referencedColumns: ["id"]
          },
        ]
      }
      past_event_translations: {
        Row: {
          description: string
          id: string
          locale: string
          location_name: string | null
          past_event_id: string
          title: string
        }
        Insert: {
          description: string
          id?: string
          locale: string
          location_name?: string | null
          past_event_id: string
          title: string
        }
        Update: {
          description?: string
          id?: string
          locale?: string
          location_name?: string | null
          past_event_id?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "past_event_translations_past_event_id_fkey"
            columns: ["past_event_id"]
            isOneToOne: false
            referencedRelation: "past_events"
            referencedColumns: ["id"]
          },
        ]
      }
      past_events: {
        Row: {
          created_at: string
          created_by: string | null
          id: string
          is_published: boolean
          occurred_on: string
          slug: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          id?: string
          is_published?: boolean
          occurred_on: string
          slug: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          id?: string
          is_published?: boolean
          occurred_on?: string
          slug?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "past_events_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string
          full_name: string | null
          id: string
          is_active: boolean
          locale: string
          role: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email: string
          full_name?: string | null
          id: string
          is_active?: boolean
          locale?: string
          role?: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
          is_active?: boolean
          locale?: string
          role?: string
          updated_at?: string
        }
        Relationships: []
      }
      project_translations: {
        Row: {
          description: string
          id: string
          locale: string
          objectives: string | null
          project_id: string
          title: string
        }
        Insert: {
          description: string
          id?: string
          locale: string
          objectives?: string | null
          project_id: string
          title: string
        }
        Update: {
          description?: string
          id?: string
          locale?: string
          objectives?: string | null
          project_id?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_translations_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          beneficiaries_count: number | null
          created_at: string
          created_by: string | null
          end_date: string | null
          id: string
          is_published: boolean
          location: string | null
          slug: string
          start_date: string | null
          status: string
          updated_at: string
        }
        Insert: {
          beneficiaries_count?: number | null
          created_at?: string
          created_by?: string | null
          end_date?: string | null
          id?: string
          is_published?: boolean
          location?: string | null
          slug: string
          start_date?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          beneficiaries_count?: number | null
          created_at?: string
          created_by?: string | null
          end_date?: string | null
          id?: string
          is_published?: boolean
          location?: string | null
          slug?: string
          start_date?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "projects_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_edit_content: { Args: never; Returns: boolean }
      current_role: { Args: never; Returns: string }
      is_super_admin: { Args: never; Returns: boolean }
    }
    Enums: {
      [_ in never]: never
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
    Enums: {},
  },
} as const
