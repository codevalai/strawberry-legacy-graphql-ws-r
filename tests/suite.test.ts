import assert from 'node:assert/strict';
import { test } from 'node:test';
import { AutonomousOrchestrator } from '../src/agents/orchestrator.js';

test('Orchestrator executes task and preserves audit trail', async () => {
  const orchestrator = new AutonomousOrchestrator();
  const res = await orchestrator.dispatch({
    id: 'task-001',
    topic: 'Security invariant validation',
    priority: 'critical',
    parameters: { depth: 3 },
  });

  assert.equal(res.status, 'executed');
  assert.equal(orchestrator.getAuditTrail().length, 1);
});
