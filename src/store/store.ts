import {
  LocalStorageInterfaceV0ToV1,
  LocalStorageInterfaceV1ToV2,
  LocalStorageInterfaceV2ToV3,
  LocalStorageInterfaceV3ToV4,
} from '@type/chat';
import { create, StoreApi } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthSlice, createAuthSlice } from './auth-slice';
import { ChatSlice, createChatSlice } from './chat-slice';
import { ConfigSlice, createConfigSlice } from './config-slice';
import { createInputSlice, InputSlice } from './input-slice';
import { migrateV0, migrateV1, migrateV2, migrateV3 } from './migrate';
import { createPromptSlice, PromptSlice } from './prompt-slice';

export type StoreState = ChatSlice &
  InputSlice &
  AuthSlice &
  ConfigSlice &
  PromptSlice;

export type StoreSlice<T> = (
  set: StoreApi<StoreState>['setState'],
  get: StoreApi<StoreState>['getState']
) => T;

const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      ...createChatSlice(set, get),
      ...createInputSlice(set, get),
      ...createAuthSlice(set, get),
      ...createConfigSlice(set, get),
      ...createPromptSlice(set, get),
    }),
    {
      name: 'markllego',
      partialize: (state) => ({
        chats: state.chats,
        currentChatIndex: state.currentChatIndex,
        apiKey: state.apiKey,
        apiFree: state.apiFree,
        apiEndpoint: state.apiEndpoint,
        theme: state.theme,
        autoTitle: state.autoTitle,
        prompts: state.prompts,
      }),
      version: 4,
      migrate: (persistedState, version) => {
        switch (version) {
          case 0:
            migrateV0(persistedState as LocalStorageInterfaceV0ToV1);
          case 1:
            migrateV1(persistedState as LocalStorageInterfaceV1ToV2);
          case 2:
            migrateV2(persistedState as LocalStorageInterfaceV2ToV3);
          case 3:
            migrateV3(persistedState as LocalStorageInterfaceV3ToV4);
            break;
        }
        return persistedState as StoreState;
      },
    }
  )
);

export default useStore;
