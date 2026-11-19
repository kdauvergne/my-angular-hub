import { Routes } from '@angular/router';

export const LESSONS_ROUTES: Routes = [
  {
    path: 'text-interpolation-lesson',
    title: 'Text interpolation',
    loadComponent: () =>
      import('./text-interpolation-lesson/text-interpolation-lesson').then(
        (m) => m.TextInterpolationLesson,
      ),
  },
  {
    path: 'attribute-binding-lesson',
    title: 'Attribute binding',
    loadComponent: () =>
      import('./attributes-binding-lesson/attributes-binding-lesson').then(
        (m) => m.AttributesBindingLesson,
      ),
  },
  {
    path: 'two-way-binding-lesson',
    title: 'Two way binding',
    loadComponent: () =>
      import('./two-way-binding-lesson/two-way-binding-lesson').then((m) => m.TwoWayBindingLesson),
  },
  {
    path: 'conditional-rendering-lesson',
    title: 'Conditional rendering',
    loadComponent: () =>
      import('./conditional-rendering-lesson/conditional-rendering-lesson').then(
        (m) => m.ConditionalRenderingLesson,
      ),
  },
  {
    path: 'list-rendering-lesson',
    title: 'List rendering',
    loadComponent: () =>
      import('./list-rendering-lesson/list-rendering-lesson').then((m) => m.ListRenderingLesson),
  },
  {
    path: 'signals-lesson',
    title: 'Signals',
    loadComponent: () => import('./signals-lesson/signals-lesson').then((m) => m.SignalsLesson),
  },
  {
    path: 'dynamic-styling-lesson',
    title: 'Dynamic styling',
    loadComponent: () =>
      import('./dynamic-styling-lesson/dynamic-styling-lesson').then((m) => m.DynamicStylingLesson),
  },
  {
    path: 'observables-lesson',
    title: 'Observables',
    loadComponent: () =>
      import('./observables-lesson/observables-lesson').then((m) => m.ObservablesLesson),
  },
  {
    path: 'http-client-lesson',
    title: 'HttpClient',
    loadComponent: () =>
      import('./http-client-lesson/http-client-lesson').then((m) => m.HttpClientLesson),
  },
  {
    path: 'models-lesson',
    title: 'Models',
    loadComponent: () => import('./models-lesson/models-lesson').then((m) => m.ModelsLesson),
  },
  {
    path: 'services-injection-lesson',
    title: 'Services & injection',
    loadComponent: () =>
      import('./services-injection-lesson/services-injection-lesson').then(
        (m) => m.ServicesInjectionLesson,
      ),
  },
  {
    path: 'component-communication-lesson',
    title: 'Component communication',
    loadComponent: () =>
      import('./component-communication-lesson/component-communication-lesson').then(
        (m) => m.ComponentCommunicationLesson,
      ),
  },
  {
    path: 'router-lesson',
    title: 'Router',
    loadComponent: () => import('./router-lesson/router-lesson').then((m) => m.RouterLesson),
  },
];
