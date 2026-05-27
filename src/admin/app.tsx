import React, { useEffect, useState } from 'react';
import { useFetchClient } from '@strapi/strapi/admin';
import type { StrapiApp } from '@strapi/strapi/admin';

type Status = 'loading' | 'done' | 'error';

const RebuildPage: React.FC = () => {
  const [status, setStatus] = useState<Status>('loading');
  const { post } = useFetchClient();

  useEffect(() => {
    const trigger = async () => {
      try {
        await post('/api/rebuild');
        setStatus('done');
      } catch (e) {
        console.error('Rebuild failed', e);
        setStatus('error');
      }
    };
    trigger();
  }, []);

  const message: Record<Status, string> = {
    loading: 'Triggering rebuild…',
    done: 'Rebuild triggered successfully.',
    error: 'Rebuild failed – check server logs.',
  };

  const color: Record<Status, string> = {
    loading: '#666',
    done: '#328048',
    error: '#ee5e52',
  };

  return (
    <div style={{ padding: '56px', maxWidth: '600px' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '8px' }}>
        Rebuild frontend
      </h1>
      <p style={{ color: '#666', marginBottom: '24px' }}>
        This page triggers a full frontend rebuild via Coolify.
      </p>
      <p style={{ fontWeight: 600, color: color[status] }}>{message[status]}</p>
    </div>
  );
};

export default {
  config: {
    locales: [],
  },

  register(app: StrapiApp) {
    app.addMenuLink({
      to: '/rebuild',
      icon: () => '🚀',
      intlLabel: {
        id: 'rebuild.label',
        defaultMessage: 'Rebuild frontend',
      },
      permissions: [],          // visible to all admins
      position: 99,             // near bottom of main list, above Settings
      Component: async () => ({ default: RebuildPage }),
    });
  },
};