// app/client.tsx
/// <reference types="vinxi/types/client" />
import { hydrateRoot } from 'react-dom/client'
import { StartClient } from '@tanstack/react-start'
import { createRouter } from './router'

const router = createRouter()

// Hydrate once client-side once route resolves to client via <StartClient />.
hydrateRoot(document, <StartClient router={router} />)