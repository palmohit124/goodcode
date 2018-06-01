import {EffectSources} from '@ngrx/effects';
import {APP_BOOTSTRAP_LISTENER, Inject, InjectionToken, Type} from '@angular/core';

export * from './auth.effects';
export * from './user-profile.effects';
export * from './customer.effects';

// The following bootstrap code is very sensitive and the current recommendation from the authors of the ngrx library
// See: https://github.com/ngrx/platform/issues/174
export const BOOTSTRAP_EFFECTS = new InjectionToken('Bootstrap Effects');

export function bootstrapEffects(effects: Type<any>[], sources: EffectSources) {
  return () => effects.forEach(effect => sources.addEffects(effect));
}

export function createInstances(...instances: any[]) {
  return instances;
}

export function provideBootstrapEffects(effects: Type<any>[]) {
  return [
    effects,
    {provide: BOOTSTRAP_EFFECTS, deps: effects, useFactory: createInstances},
    {
      provide: APP_BOOTSTRAP_LISTENER,
      multi: true,
      useFactory: bootstrapEffects,
      deps: [[new Inject(BOOTSTRAP_EFFECTS)], EffectSources],
    },
  ];
}
