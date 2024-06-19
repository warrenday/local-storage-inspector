import { EventEmitter } from "eventemitter3";

// Define the types of events and their corresponding payloads
interface EditorEvents {
  change: (value: string) => void;
  blur: () => void;
  focus: () => void;
}

const createEmitter = () => new EventEmitter<EditorEvents>();

export default createEmitter;
