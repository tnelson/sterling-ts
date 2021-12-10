import { AlloyInstance } from '@/alloy-instance';

export interface AlloyTrace {
  loopBack: number;
  instances: AlloyInstance[];
}
