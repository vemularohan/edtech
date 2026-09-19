export interface ConceptStageContent {
  title: string;
  explanation: string;
  skillId?: string;
  difficultyLevel?: number;
  xpReward?: number;
  mentorHints?: string[];
  yourTurnPrompt?: string;
  yourTurnStarterCode?: string;
  yourTurnSolution?: string;
  rubricCriteria?: string[];
  predictCode: string;
  predictPrompt: string;
  predictOptions: { id: string; text: string; isCorrect: boolean; feedback: string }[];
  breakItCode: string;
  breakItPrompt: string;
  breakItOptions: { id: string; text: string; isCorrect: boolean; feedback: string }[];
  fixCode: string;
}

export interface Module01StageContent {
  mission01: {
    title: string;
    scenario: {
      title: string;
      code: string;
      expected: string;
      actual: string;
      prompt: string;
      options: { id: string; text: string; feedback: string; isCorrect: boolean }[];
    };
  };
  mentalModel: {
    title: string;
    explanation: string;
    pillars: { title: string; desc: string; code: string; insight: string }[];
    predictPrompt: string;
    predictCode: string;
    predictOptions: { id: string; text: string; isCorrect: boolean; feedback: string }[];
    mentorHints?: string[];
  };
  typesAndVariables: ConceptStageContent & {
    types: { name: string; example: string; pitfall: string }[];
  };
  operators: ConceptStageContent;
  decisions: ConceptStageContent;
  loops: ConceptStageContent;
  functions: ConceptStageContent;
  dataStructures: ConceptStageContent;
  filesAndPaths: ConceptStageContent;
  jsonHandling: ConceptStageContent;
  envAndDependencies: ConceptStageContent;
  debuggingLab: {
    title: string;
    explanation: string;
    challenges: {
      id: string;
      title: string;
      code: string;
      bugDesc: string;
      prompt: string;
      options: { id: string; text: string; isCorrect: boolean; feedback: string }[];
      fixedCode: string;
    }[];
  };
  finalProject: {
    title: string;
    mission: string;
    starterCode: string;
    requirements: string[];
    hiddenEdgeCases: string[];
    sampleJSON: string;
    tests: { id: string; inputName: string; expectedStatus: string; description: string }[];
    solutionCode: string;
    rubric?: {
      id: string;
      title: string;
      criterion: string;
      hint: string;
      maxPoints: number;
    }[];
  };
}

export const module01Content: Module01StageContent = {
  mission01: {
    title: "Mission 01 — Can You Trust AI-Generated Python?",
    scenario: {
      title: "INCIDENT REPORT #101 — AI Data Pipeline Failure",
      code: `def process_user_metrics(raw_json_str):
    import json
    data = json.loads(raw_json_str)
    
    total_score = 0
    count = 0
    for user in data["users"]:
        # AI generated this metric aggregation:
        total_score += user["score"]
        count += 1
        
    avg = total_score / count
    return f"Average User Score: {avg:.2f}"

# Production Payload:
payload = '{"users": [{"id": 1, "score": 85}, {"id": 2, "score": "92"}]}'
print(process_user_metrics(payload))`,
      expected: "Calculated average user score of 88.50 for the 2 users.",
      actual: "CRASH! TypeError: unsupported operand type(s) for +=: 'int' and 'str'",
      prompt: "An AI assistant generated this data parser script. It looked 100% correct in the code editor window. Why did it crash on the second user payload?",
      options: [
        {
          id: "m1-opt1",
          text: "User #2's score arrived as a string '92' instead of an integer 92, causing Python's strong typing to refuse int + str.",
          feedback: "Spot on! Python will NEVER implicitly cast '92' into 92 during arithmetic addition. AI code generators often assume clean integer payloads.",
          isCorrect: true
        },
        {
          id: "m1-opt2",
          text: "json.loads failed to parse the JSON string payload.",
          feedback: "Incorrect — the JSON syntax is valid. json.loads parsed it fine, but preserves JSON data types (numbers as ints, quoted values as strings).",
          isCorrect: false
        },
        {
          id: "m1-opt3",
          text: "The loop variable count caused a ZeroDivisionError.",
          feedback: "Incorrect — the payload has 2 users, so count becomes 2. The crash occurred inside the loop during total_score += user['score'].",
          isCorrect: false
        }
      ]
    }
  },
  mentalModel: {
    title: "02 — Python Mental Model: Objects, References & Dynamic Typing",
    explanation: "In Python, EVERYTHING is an object in memory. Variables are not buckets holding values — variables are name tags pointing to objects in memory.",
    pillars: [
      {
        title: "Names point to objects",
        desc: "When you write x = 10, x is a name bound to an Integer object in memory. Setting y = x makes y point to the EXACT SAME object.",
        code: `a = [1, 2, 3]\nb = a\nb.append(4)\nprint(a) # [1, 2, 3, 4]! 'a' and 'b' tag the same list!`,
        insight: "Mutating a shared list reference alters all variables tagging that list. In AI pipelines, mutating shared prompt contexts creates silent bugs."
      },
      {
        title: "Dynamic typing vs Strong typing",
        desc: "Python is dynamically typed (variables can point to any type) but STRONGLY typed (operations between incompatible types raise errors instead of guessing).",
        code: `# JavaScript guesses and turns 10 + "5" into "105"\n# Python refuses:\n10 + "5" # ❌ TypeError`,
        insight: "AI models return text. If an LLM returns '100' tokens, Python requires explicit conversion int('100') before budget calculations."
      }
    ],
    predictPrompt: "Inspect this reference assignment. What will print(data_b) output?",
    predictCode: `data_a = {"model": "gpt-4o", "temperature": 0.7}
data_b = data_a
data_b["temperature"] = 0.2

print(data_a["temperature"])`,
    predictOptions: [
      { id: "mm-1", text: "0.2 — because data_a and data_b point to the exact same dictionary in memory", isCorrect: true, feedback: "Correct! Dictionaries are mutable objects. Mutating data_b modifies the object that data_a tags." },
      { id: "mm-2", text: "0.7 — data_b was a copy of data_a", isCorrect: false, feedback: "Incorrect! Assignment = does NOT create a copy in Python; it only copies the reference." },
      { id: "mm-3", text: "SyntaxError", isCorrect: false, feedback: "Incorrect — this is completely valid Python syntax." }
    ]
  },
  typesAndVariables: {
    title: "03 — Values, Types & Variables",
    skillId: "python-types",
    difficultyLevel: 2,
    xpReward: 30,
    explanation: "AI applications process 6 core primitive types: int, float, str, bool, None, and collections. Knowing immutability and conversion prevents API payload crashes.",
    mentorHints: [
      "Conceptual Check: What type does Python assign when a number is surrounded by quotes, like '1500'?",
      "Mental Model Rule: Python is strongly typed. It refuses implicit type conversion during arithmetic operations.",
      "Inspection: Look at `(token_count / 1000) * rate_per_k`. The division operator `/` fails when the left operand is a string.",
      "Scaffold: Cast `token_count` to an integer using `int()` before performing mathematical division.",
      "Full Solution: `clean_tokens = int(token_count); return (clean_tokens / 1000) * rate_per_k`."
    ],
    yourTurnPrompt: "Write `format_token_budget(model_name, total_tokens, cost_per_1k)`. Safely cast string tokens to int, calculate cost, and return an f-string: f'{model_name}: {total_tokens} tokens (${cost:.4f})'.",
    yourTurnStarterCode: `def format_token_budget(model_name, total_tokens, cost_per_1k):
    # Safely convert total_tokens and return formatted string
    pass`,
    yourTurnSolution: `def format_token_budget(model_name, total_tokens, cost_per_1k):
    tokens = int(total_tokens)
    cost = (tokens / 1000.0) * float(cost_per_1k)
    return f"{model_name}: {tokens} tokens (\${cost:.4f})"`,
    rubricCriteria: [
      "Safely casts total_tokens to integer or float",
      "Calculates dollar cost per 1,000 tokens",
      "Returns valid f-string formatted to 4 decimal places"
    ],
    types: [
      { name: "int", example: "tokens = 4096", pitfall: "Overflow is not an issue in Python, but int('4.5') crashes." },
      { name: "float", example: "temperature = 0.7", pitfall: "Floating point precision errors: 0.1 + 0.2 != 0.3 (evaluates to 0.30000000000000004)." },
      { name: "str", example: "prompt = 'Summarize context'", pitfall: "Strings are IMMUTABLE. Methods like prompt.upper() return a NEW string; they don't change original." },
      { name: "bool", example: "is_stream = True", pitfall: "Booleans inherit from int: True == 1 and False == 0." },
      { name: "None", example: "response = None", pitfall: "Accessing response.text when response is None raises AttributeError." }
    ],
    predictPrompt: "What will print(system_prompt) display?",
    predictCode: `system_prompt = "You are a helpful assistant."
system_prompt.replace("helpful", "strict")

print(system_prompt)`,
    predictOptions: [
      { id: "tv-1", text: "\"You are a helpful assistant.\" (Strings are immutable, replace returns a new string!)", isCorrect: true, feedback: "Spot on! replace() returns a new string object. Because the return value wasn't assigned (system_prompt = ...), the original string remains unchanged!" },
      { id: "tv-2", text: "\"You are a strict assistant.\"", isCorrect: false, feedback: "Incorrect — Python strings are immutable and cannot be mutated in place!" }
    ],
    breakItCode: `def calculate_token_cost(token_count, rate_per_k):
    # Buggy type assumption:
    return (token_count / 1000) * rate_per_k

# User passes token count from web form query parameter:
user_input = "1500" # string from request.args
cost = calculate_token_cost(user_input, 0.002)
print("Cost:", cost)`,
    breakItPrompt: "Don't protect the code. Try to execute calculate_token_cost('1500', 0.002). What fails?",
    breakItOptions: [
      { id: "tvb-1", text: "TypeError: unsupported operand type(s) for /: 'str' and 'int'", isCorrect: true, feedback: "Bingo! Python refuses to divide the string '1500' by integer 1000 without explicit int(user_input)." },
      { id: "tvb-2", text: "Calculates cost as $0.003 cleanly", isCorrect: false, feedback: "Incorrect — string division raises a TypeError in Python." }
    ],
    fixCode: `def calculate_token_cost(token_count, rate_per_k):
    # Defensive type conversion:
    clean_tokens = int(token_count)
    return (clean_tokens / 1000) * rate_per_k`
  },
  operators: {
    title: "04 — Operators & Expressions",
    skillId: "control-flow",
    difficultyLevel: 2,
    xpReward: 30,
    explanation: "Operators allow Python to evaluate relationships. In AI applications, comparison (==, !=), logical (and, or, not), and membership (in, not in) operators steer pipeline execution.",
    mentorHints: [
      "Conceptual Check: What is the relative precedence of `and` vs `or` in Python expressions?",
      "Mental Model Rule: `not` evaluates first, then `and`, then `or`. `and` binds more tightly than `or`.",
      "Inspection: Look at `user_role == 'admin' or user_role == 'developer' and total_spent > 100`. Python treats this as `user_role == 'admin' or (user_role == 'developer' and total_spent > 100)`.",
      "Scaffold: Enclose the role choices `(user_role == 'admin' or user_role == 'developer')` in parentheses.",
      "Full Solution: `return (user_role == 'admin' or user_role == 'developer') and total_spent > 100`."
    ],
    yourTurnPrompt: "Write `is_eligible_for_tier(account_age_days, verified, strikes)`. A user is eligible if they are verified AND account age is at least 30 days, OR if they have 0 strikes and account age is at least 90 days. Group conditions with parentheses.",
    yourTurnStarterCode: `def is_eligible_for_tier(account_age_days, verified, strikes):
    # Return boolean result with explicit precedence
    pass`,
    yourTurnSolution: `def is_eligible_for_tier(account_age_days, verified, strikes):
    return (verified and account_age_days >= 30) or (strikes == 0 and account_age_days >= 90)`,
    rubricCriteria: [
      "Uses explicit parentheses to group logical conditions",
      "Correctly checks account_age_days thresholds",
      "Handles boolean combinations without precedence ambiguity"
    ],
    predictPrompt: "What will print(result) display?",
    predictCode: `query = "Show me the invoice PDF"
is_valid_user = True
is_admin = False

result = "invoice" in query and (is_valid_user or is_admin)
print(result)`,
    predictOptions: [
      { id: "op-1", text: "True", isCorrect: true, feedback: "Correct! 'invoice' in query is True, (True or False) is True. True and True evaluates to True." },
      { id: "op-2", text: "False", isCorrect: false, feedback: "Incorrect — both sides of the and operator evaluate to True." }
    ],
    breakItCode: `def can_access_model(user_role, total_spent):
    # INTENTIONAL BUG: AI wrote operator precedence without parentheses
    return user_role == "admin" or user_role == "developer" and total_spent > 100

# Test run for guest who spent $500:
print(can_access_model("guest", 500))
# Test run for developer who spent $10:
print(can_access_model("developer", 10))`,
    breakItPrompt: "Inspect can_access_model('developer', 10). Developer spent $10, limit requires > $100. What does the function return?",
    breakItOptions: [
      { id: "opb-1", text: "False — because and has higher precedence than or, so ('developer' == 'developer' and 10 > 100) evaluates to False.", isCorrect: true, feedback: "Correct! and binds tighter than or. False or (True and False) -> False." },
      { id: "opb-2", text: "True — because developer matches", isCorrect: false, feedback: "Incorrect — and binds higher so total_spent > 100 is checked against developer role." }
    ],
    fixCode: `def can_access_model(user_role, total_spent):
    # Explicit parentheses make intent unambiguous:
    return (user_role == "admin" or user_role == "developer") and total_spent > 100`
  },
  decisions: {
    title: "05 — Control Flow: Decisions",
    skillId: "control-flow",
    difficultyLevel: 3,
    xpReward: 35,
    explanation: "AI applications branch on model response status codes, moderation checks, and tool choices using if/elif/else statements.",
    mentorHints: [
      "Conceptual Check: Does Python check all `elif` branches or exit as soon as one condition evaluates to True?",
      "Mental Model Rule: Python evaluates branches in order from top to bottom and terminates evaluation on the first True condition.",
      "Inspection: With `score = 0.95`, the first check `score > 0.3` is True, so Python returns 'LOW_RISK' without checking `score > 0.8`.",
      "Scaffold: Order your conditions from most specific / highest threshold down to lowest threshold.",
      "Full Solution: Put `if score > 0.8: return 'HIGH_RISK'` first, followed by `elif score > 0.3: return 'LOW_RISK'`, and `else: return 'SAFE'`."
    ],
    yourTurnPrompt: "Write `route_query(query_length, contains_image, user_tier)`. Return 'pro' if user_tier == 'enterprise' or query_length >= 500 or contains_image. Otherwise return 'flash' if query_length < 50 and not contains_image. Otherwise return 'standard'.",
    yourTurnStarterCode: `def route_query(query_length, contains_image, user_tier):
    pass`,
    yourTurnSolution: `def route_query(query_length, contains_image, user_tier):
    if user_tier == "enterprise" or query_length >= 500 or contains_image:
        return "pro"
    elif query_length < 50 and not contains_image:
        return "flash"
    return "standard"`,
    rubricCriteria: [
      "Places high-priority/enterprise checks before low-priority fallbacks",
      "Combines boolean flags cleanly in conditional branches",
      "Provides fallback default branch"
    ],
    predictPrompt: "What status message is logged for status_code 429?",
    predictCode: `def handle_api_status(status_code):
    if status_code == 200:
        return "SUCCESS"
    elif status_code == 429:
        return "RATE_LIMITED"
    elif status_code >= 500:
        return "SERVER_ERROR"
    else:
        return "UNKNOWN_ERROR"

print(handle_api_status(429))`,
    predictOptions: [
      { id: "dec-1", text: "\"RATE_LIMITED\"", isCorrect: true, feedback: "Correct! The elif status_code == 429 branch matches first and returns immediately." },
      { id: "dec-2", text: "\"UNKNOWN_ERROR\"", isCorrect: false, feedback: "Incorrect — status_code 429 matches the second branch." }
    ],
    breakItCode: `def classify_toxicity(score):
    # INTENTIONAL BUG: Inverted branch order!
    if score > 0.3:
        return "LOW_RISK"
    elif score > 0.8:
        return "HIGH_RISK"
    else:
        return "SAFE"

# Test run on severe toxic score 0.95:
print(classify_toxicity(0.95))`,
    breakItPrompt: "A toxic prompt arrives with score 0.95. What risk level does this buggy function return?",
    breakItOptions: [
      { id: "decb-1", text: "\"LOW_RISK\" — because 0.95 > 0.3 is True, so it returns before reaching the > 0.8 check!", isCorrect: true, feedback: "Bingo! In decision trees, evaluate specific/restrictive conditions (like > 0.8) BEFORE general ones (> 0.3)." },
      { id: "decb-2", text: "\"HIGH_RISK\"", isCorrect: false, feedback: "Incorrect — python evaluates branches top-to-bottom and stops at the FIRST matching condition." }
    ],
    fixCode: `def classify_toxicity(score):
    # Fixed branch ordering: Most specific first
    if score > 0.8:
        return "HIGH_RISK"
    elif score > 0.3:
        return "LOW_RISK"
    else:
        return "SAFE"`
  },
  loops: {
    title: "06 — Loops & Repetition",
    skillId: "control-flow",
    difficultyLevel: 3,
    xpReward: 35,
    explanation: "Loops iterate over document chunks, retry failed API requests, and transform datasets. List comprehensions offer clean, readable filtering.",
    mentorHints: [
      "Conceptual Check: What condition stops a `while` loop from continuing forever?",
      "Mental Model Rule: Every while loop must advance its state variable toward the exit condition on every iteration.",
      "Inspection: In `retry_api_call`, find where `attempts` is modified. If commented out, `attempts < max_retries` is always true.",
      "Scaffold: Add `attempts += 1` inside the loop body, or rewrite as a bounded `for attempt in range(max_retries):` loop.",
      "Full Solution: `attempts += 1` placed inside the while loop body, or `for attempt in range(max_retries):`."
    ],
    yourTurnPrompt: "Use a list comprehension to write `clean_document_chunks(chunks)`. Strip whitespace from each chunk, filter out any empty strings or strings shorter than 3 characters, and return the clean list.",
    yourTurnStarterCode: `def clean_document_chunks(chunks):
    # Return list comprehension with stripping and length filter
    pass`,
    yourTurnSolution: `def clean_document_chunks(chunks):
    return [c.strip() for c in chunks if c and len(c.strip()) >= 3]`,
    rubricCriteria: [
      "Uses a concise, pythonic list comprehension",
      "Strips whitespace on all chunks",
      "Safely filters out empty and short strings"
    ],
    predictPrompt: "What will this list comprehension produce?",
    predictCode: `chunks = ["Title: AI Guide", "  ", "Section 1: Python", "", "Section 2: RAG"]
clean_chunks = [c.strip().upper() for c in chunks if c.strip()]

print(clean_chunks)`,
    predictOptions: [
      { id: "loop-1", text: "['TITLE: AI GUIDE', 'SECTION 1: PYTHON', 'SECTION 2: RAG']", isCorrect: true, feedback: "Spot on! The if c.strip() condition filters out empty and whitespace-only strings before converting valid chunks to uppercase." },
      { id: "loop-2", text: "['TITLE: AI GUIDE', '', 'SECTION 1: PYTHON', '', 'SECTION 2: RAG']", isCorrect: false, feedback: "Incorrect — the comprehension condition if c.strip() cleanly removed whitespace elements." }
    ],
    breakItCode: `def retry_api_call(max_retries=3):
    attempts = 0
    # INTENTIONAL BUG: Infinite loop!
    while attempts < max_retries:
        print(f"Attempt {attempts}...")
        # AI assistant forgot to increment attempts!
        # attempts += 1
        success = False
        if success:
            break

# retry_api_call()`,
    breakItPrompt: "What happens if retry_api_call() runs when the API is down (success = False)?",
    breakItOptions: [
      { id: "loopb-1", text: "Infinite loop! attempts stays 0 forever, spamming logs and hanging the program.", isCorrect: true, feedback: "Correct! Every while loop MUST advance toward its termination condition (attempts += 1)." },
      { id: "loopb-2", text: "Stops cleanly after 3 attempts", isCorrect: false, feedback: "Incorrect — without attempts += 1, attempts < max_retries remains True forever." }
    ],
    fixCode: `def retry_api_call(max_retries=3):
    attempts = 0
    while attempts < max_retries:
        attempts += 1
        print(f"Attempt {attempts}...")
        success = False
        if success:
            return "SUCCESS"
    return "FAILED_AFTER_RETRIES"`
  },
  functions: {
    title: "07 — Functions: Modular Programming",
    skillId: "functions",
    difficultyLevel: 4,
    xpReward: 40,
    explanation: "Functions isolate responsibilities, accept default arguments, return structured values, and document intent with docstrings.",
    mentorHints: [
      "Conceptual Check: When does Python evaluate default parameter values: when the function is defined, or each time it is called?",
      "Mental Model Rule: Python evaluates default parameter expressions once at function definition time. Mutable defaults retain modifications between calls!",
      "Inspection: In `def add_message(msg, history=[]):`, `history` points to one single shared list object across the life of the program.",
      "Scaffold: Set `history=None` as the default in the signature, and initialize `if history is None: history = []` inside the function body.",
      "Full Solution: `def add_message(msg, history=None): if history is None: history = []; history.append(msg); return history`."
    ],
    yourTurnPrompt: "Write `create_chat_session(system_role='assistant', initial_messages=None)`. Safely handle mutable default arguments, prepend `{'role': 'system', 'content': system_role}`, append initial_messages if provided, and return the list.",
    yourTurnStarterCode: `def create_chat_session(system_role="assistant", initial_messages=None):
    # Safely create message history list
    pass`,
    yourTurnSolution: `def create_chat_session(system_role="assistant", initial_messages=None):
    messages = [{"role": "system", "content": system_role}]
    if initial_messages:
        messages.extend(initial_messages)
    return messages`,
    rubricCriteria: [
      "Uses safe default argument (initial_messages=None)",
      "Initializes system prompt dictionary as first message",
      "Appends extra messages without shared state leakage"
    ],
    predictPrompt: "What will build_prompt('Summarize text') return?",
    predictCode: `def build_prompt(user_query, system_role="You are a helpful AI tutor."):
    """Builds a formatted message dictionary for LLM APIs."""
    return [
        {"role": "system", "content": system_role},
        {"role": "user", "content": user_query}
    ]

print(build_prompt("Summarize text")[0]["content"])`,
    predictOptions: [
      { id: "fn-1", text: "\"You are a helpful AI tutor.\" (Uses default system_role argument)", isCorrect: true, feedback: "Correct! When system_role is omitted, Python falls back to the default parameter value." },
      { id: "fn-2", text: "KeyError: 'system'", isCorrect: false, feedback: "Incorrect — the list index [0] returns the first message dict which contains key 'content'." }
    ],
    breakItCode: `def add_message(msg, history=[]): # ❌ MUTABLE DEFAULT ARGUMENT BUG!
    history.append(msg)
    return history

print(add_message("Hello"))
print(add_message("How are you?"))`,
    breakItPrompt: "Look at default argument history=[]. What does add_message('How are you?') output?",
    breakItOptions: [
      { id: "fnb-1", text: "['Hello', 'How are you?'] — because default mutable arguments are evaluated ONCE at function definition time, sharing state across calls!", isCorrect: true, feedback: "Masterful catch! Default mutable arguments ([], {}) persist across function calls. Always use history=None." },
      { id: "fnb-2", text: "['How are you?']", isCorrect: false, feedback: "Incorrect — the default list [] was mutated in place on the first call!" }
    ],
    fixCode: `def add_message(msg, history=None):
    # Safe default pattern:
    if history is None:
        history = []
    history.append(msg)
    return history`
  },
  dataStructures: {
    title: "08 — Data Structures: JSON-Shaped AI Data",
    skillId: "data-structures",
    difficultyLevel: 4,
    xpReward: 40,
    explanation: "Lists (sequences), Dicts (JSON key-value maps), Sets (unique values), and Tuples (immutable records). Safe dictionary key access with .get() is essential.",
    mentorHints: [
      "Conceptual Check: What happens if an LLM API payload doesn't contain a key you index with square brackets `data['choices']`?",
      "Mental Model Rule: Direct bracket access `data['key']` throws a KeyError if missing. The `.get('key', default)` method safely falls back.",
      "Inspection: In `extract_response`, `data['choices'][0]['message']['text']` assumes `'choices'` is non-empty and uses key `'text'` instead of `'content'`.",
      "Scaffold: Extract `choices = data.get('choices', [])`, verify it is non-empty, then extract `.get('message', {}).get('content', '')`.",
      "Full Solution: `choices = data.get('choices', []); if not choices: return 'No response'; return choices[0].get('message', {}).get('content', '')`."
    ],
    yourTurnPrompt: "Write `extract_model_metadata(response_dict)`. Safely extract `'model'` (default 'unknown'), `'prompt_tokens'` and `'completion_tokens'` from nested `'usage'` dict (default 0), and return a dictionary with total_tokens calculated.",
    yourTurnStarterCode: `def extract_model_metadata(response_dict):
    # Safely navigate nested keys using .get()
    pass`,
    yourTurnSolution: `def extract_model_metadata(response_dict):
    model = response_dict.get("model", "unknown")
    usage = response_dict.get("usage", {})
    p = usage.get("prompt_tokens", 0)
    c = usage.get("completion_tokens", 0)
    return {"model": model, "prompt_tokens": p, "completion_tokens": c, "total_tokens": p + c}`,
    rubricCriteria: [
      "Uses .get() for top-level and nested dictionary keys",
      "Provides appropriate default values",
      "Calculates total_tokens accurately"
    ],
    predictPrompt: "What does user.get('tier', 'free') return when key 'tier' is missing?",
    predictCode: `user = {"name": "Rohan", "score": 95}
user_tier = user.get("tier", "free")
missing_key = user.get("api_key")

print(user_tier, "|", missing_key)`,
    predictOptions: [
      { id: "ds-1", text: "free | None", isCorrect: true, feedback: "Spot on! .get(key, default) returns default 'free' if missing, and None if default is unprovided." },
      { id: "ds-2", text: "KeyError exception", isCorrect: false, feedback: "Incorrect — .get() never raises KeyError, unlike bracket lookup user['tier']!" }
    ],
    breakItCode: `payload = {
    "model": "gpt-4o",
    "choices": [
        {"message": {"role": "assistant", "content": "Hello world!"}}
    ]
}

# INTENTIONAL BUG: Unsafe nested dictionary access
def extract_response(data):
    # What if 'choices' is empty or missing?
    return data["choices"][0]["message"]["text"] # ❌ Key 'text' vs 'content'!

print(extract_response(payload))`,
    breakItPrompt: "What happens when extract_response(payload) runs on the LLM API response?",
    breakItOptions: [
      { id: "dsb-1", text: "KeyError: 'text' — because OpenAI payload uses key 'content', not 'text'!", isCorrect: true, feedback: "Bingo! Unvalidated dictionary access crashes on key mismatches." },
      { id: "dsb-2", text: "Returns 'Hello world!'", isCorrect: false, feedback: "Incorrect — the payload dictionary key is 'content', not 'text'." }
    ],
    fixCode: `def extract_response(data):
    # Safe defensive nested extraction:
    choices = data.get("choices", [])
    if not choices:
        return "No response generated"
    first_choice = choices[0]
    return first_choice.get("message", {}).get("content", "Empty content")`
  },
  filesAndPaths: {
    title: "09 — Files, Paths & Encoding",
    skillId: "file-handling",
    difficultyLevel: 4,
    xpReward: 40,
    explanation: "AI applications load prompt templates, persist logs, and read dataset files. Using pathlib.Path and specifying encoding='utf-8' prevents OS path and character encoding bugs.",
    mentorHints: [
      "Conceptual Check: Why are backslash strings like `'logs\\\\app.txt'` dangerous for cross-platform applications?",
      "Mental Model Rule: Different operating systems use different path separators. `pathlib.Path` uses the `/` operator to generate valid paths on any OS.",
      "Inspection: In `save_log`, the file is opened without a context manager (`with`) and without `encoding='utf-8'`. Writing emojis like 🚀 will fail on non-UTF-8 defaults.",
      "Scaffold: Use `path = Path('logs') / 'app.txt'`, ensure `path.parent.mkdir(parents=True, exist_ok=True)`, and open with `with open(path, 'a', encoding='utf-8') as f:`.",
      "Full Solution: `log_path = Path('logs') / 'app.txt'; log_path.parent.mkdir(parents=True, exist_ok=True); with open(log_path, 'a', encoding='utf-8') as f: f.write(log_text + '\\n')`."
    ],
    yourTurnPrompt: "Write `save_prompt_template(directory_path, filename, content)`. Use `pathlib.Path`, create parent folders if they do not exist, and write the file with `encoding='utf-8'` in a `with` statement. Return the string path.",
    yourTurnStarterCode: `from pathlib import Path

def save_prompt_template(directory_path, filename, content):
    # Use pathlib, mkdir, and UTF-8 encoding
    pass`,
    yourTurnSolution: `from pathlib import Path

def save_prompt_template(directory_path, filename, content):
    target_dir = Path(directory_path)
    target_dir.mkdir(parents=True, exist_ok=True)
    target_file = target_dir / filename
    with open(target_file, "w", encoding="utf-8") as f:
        f.write(content)
    return str(target_file)`,
    rubricCriteria: [
      "Uses pathlib.Path object joining",
      "Creates missing directories safely with mkdir(parents=True, exist_ok=True)",
      "Explicitly specifies encoding='utf-8' in open()"
    ],
    predictPrompt: "What path object method guarantees valid cross-platform path resolution?",
    predictCode: `from pathlib import Path

# Clean path handling:
base_dir = Path("./data")
file_path = base_dir / "prompts" / "system.txt"

print(file_path)`,
    predictOptions: [
      { id: "fp-1", text: "data/prompts/system.txt (or data\\prompts\\system.txt on Windows)", isCorrect: true, feedback: "Correct! The / operator overloaded by pathlib.Path creates platform-appropriate path strings." },
      { id: "fp-2", text: "SyntaxError", isCorrect: false, feedback: "Incorrect — pathlib overloads / for path joining!" }
    ],
    breakItCode: `def save_log(log_text):
    # INTENTIONAL BUG: Hardcoded Windows backslashes and missing encoding
    f = open("logs\\\\app.txt", "w") # Crashes on Mac/Linux or misinterprets \\a escape!
    f.write(log_text)
    # AI forgot f.close() or context manager!

save_log("User logged in 🚀")`,
    breakItPrompt: "What 3 bugs exist in open('logs\\\\app.txt', 'w')?",
    breakItOptions: [
      { id: "fpb-1", text: "1. Hardcoded backslash escape issue and unportable path. 2. File left open without with context manager. 3. Missing encoding='utf-8' for emoji character 🚀.", isCorrect: true, feedback: "Masterful inspection! Always use with open(path, 'w', encoding='utf-8') as f:." },
      { id: "fpb-2", text: "No bugs — file opens cleanly", isCorrect: false, feedback: "Incorrect — unescaped backslashes, open file leaks, and UTF-8 encoding failures are real risks!" }
    ],
    fixCode: `from pathlib import Path

def save_log(log_text):
    log_path = Path("logs") / "app.txt"
    log_path.parent.mkdir(parents=True, exist_ok=True)
    with open(log_path, "a", encoding="utf-8") as f:
        f.write(log_text + "\\n")`
  },
  jsonHandling: {
    title: "10 — JSON: The Lingua Franca of AI",
    skillId: "json",
    difficultyLevel: 5,
    xpReward: 45,
    explanation: "LLM tool calling, structured outputs, and API payloads depend on JSON. Defensive parsing with json.loads and validation of expected keys is mandatory.",
    mentorHints: [
      "Conceptual Check: What character wrapper around JSON commonly causes `json.loads` to crash when parsing LLM outputs?",
      "Mental Model Rule: LLMs frequently wrap json responses in markdown backtick blocks (```json ... ```). `json.loads()` strictly expects bare JSON syntax.",
      "Inspection: In `parse_model_json`, `json.loads` is given ````json\\n{\"rating\": 5}\\n````. The backtick fences immediately trigger JSONDecodeError.",
      "Scaffold: Strip leading whitespace, check `.startswith('```json')`, slice away the markdown fences, and parse inside a try/except block.",
      "Full Solution: Strip ```json from start and ``` from end, then wrap `json.loads(clean_text)` in try/except json.JSONDecodeError and validate required keys."
    ],
    yourTurnPrompt: "Write `parse_llm_json_response(raw_text, required_keys)`. Strip markdown fences (```json and ```), parse with json.loads, check that all required_keys exist, and return `(True, data)` on success or `(False, error_message)` on failure.",
    yourTurnStarterCode: `import json

def parse_llm_json_response(raw_text, required_keys):
    # Strip markdown fences, parse JSON, validate keys
    pass`,
    yourTurnSolution: `import json

def parse_llm_json_response(raw_text, required_keys):
    text = raw_text.strip()
    if text.startswith("\`\`\`json"):
        text = text[7:]
    elif text.startswith("\`\`\`"):
        text = text[3:]
    if text.endswith("\`\`\`"):
        text = text[:-3]
    text = text.strip()
    try:
        data = json.loads(text)
        if not isinstance(data, dict):
            return False, "Parsed JSON is not an object"
        for key in required_keys:
            if key not in data:
                return False, f"Missing required key: {key}"
        return True, data
    except Exception as e:
        return False, f"JSON parse error: {e}"`,
    rubricCriteria: [
      "Defensively removes markdown fences (```json and ```)",
      "Uses try/except to guard against malformed JSON",
      "Validates that all required keys are present"
    ],
    predictPrompt: "What Python type does json.loads('{\"status\": true, \"count\": 5}') produce?",
    predictCode: `import json

raw_json = '{"status": true, "count": 5, "items": null}'
parsed = json.loads(raw_json)

print(type(parsed), parsed["status"], parsed["items"])`,
    predictOptions: [
      { id: "jh-1", text: "<class 'dict'> True None (JSON true -> True, null -> None)", isCorrect: true, feedback: "Correct! json.loads parses JSON booleans (true) to Python True, and JSON null to Python None." },
      { id: "jh-2", text: "<class 'str'> true null", isCorrect: false, feedback: "Incorrect — json.loads converts JSON primitives into native Python data types." }
    ],
    breakItCode: `import json

def parse_model_json(response_text):
    # LLM returned output wrapped in markdown code blocks:
    # \`\`\`json\\n{"rating": 5}\\n\`\`\`
    data = json.loads(response_text) # ❌ Crashes on markdown ticks!
    return data["rating"]

raw_llm_output = "\`\`\`json\\n{\\"rating\\": 5}\\n\`\`\`"
print(parse_model_json(raw_llm_output))`,
    breakItPrompt: "LLM returns ```json\\n{\"rating\": 5}\\n```. What happens when passed directly to json.loads?",
    breakItOptions: [
      { id: "jhb-1", text: "json.decoder.JSONDecodeError: Expecting value — raw markdown fences cause JSON parsing failure!", isCorrect: true, feedback: "Bingo! LLMs frequently wrap JSON in markdown blocks. Strip markdown fences before parsing." },
      { id: "jhb-2", text: "Parses rating 5 cleanly", isCorrect: false, feedback: "Incorrect — json.loads strictly rejects markdown fence text." }
    ],
    fixCode: `import json

def parse_model_json(response_text):
    # Defensive cleanup of LLM markdown fences:
    clean_text = response_text.strip()
    if clean_text.startswith("\`\`\`json"):
        clean_text = clean_text[7:]
    if clean_text.startswith("\`\`\`"):
        clean_text = clean_text[3:]
    if clean_text.endswith("\`\`\`"):
        clean_text = clean_text[:-3]
    clean_text = clean_text.strip()
    
    try:
        data = json.loads(clean_text)
        if "rating" not in data:
            raise KeyError("Missing required 'rating' key in LLM output")
        return data["rating"]
    except json.JSONDecodeError as e:
        raise ValueError(f"Failed to parse LLM JSON: {e}")`
  },
  envAndDependencies: {
    title: "11 — Virtual Environments & Package Management",
    skillId: "environments",
    difficultyLevel: 4,
    xpReward: 40,
    explanation: "Isolating dependencies with venv and pinning exact versions in requirements.txt prevents 'works on my machine' breakage in AI pipelines.",
    mentorHints: [
      "Conceptual Check: What happens when two AI projects on your machine require conflicting versions of `pydantic` or `openai`?",
      "Mental Model Rule: Virtual environments isolate python interpreters and site-packages so projects never contaminate each other.",
      "Inspection: In the break-it scenario, `pip install` run globally writes into the system-wide site-packages directory.",
      "Scaffold: Always create an environment (`python3 -m venv .venv`), activate it (`source .venv/bin/activate`), and pin requirements with `==`.",
      "Full Solution: `python3 -m venv .venv; source .venv/bin/activate; pip install -r requirements.txt; pip freeze > requirements.txt`."
    ],
    yourTurnPrompt: "Write `validate_requirements_pinned(requirements_text)`. Split by line, ignore comments and empty lines, and return a list of unpinned package lines (lines without '==').",
    yourTurnStarterCode: `def validate_requirements_pinned(requirements_text):
    # Find all unpinned package entries
    pass`,
    yourTurnSolution: `def validate_requirements_pinned(requirements_text):
    unpinned = []
    for line in requirements_text.strip().splitlines():
        line = line.strip()
        if not line or line.startswith("#"):
            continue
        if "==" not in line:
            unpinned.append(line)
    return unpinned`,
    rubricCriteria: [
      "Correctly ignores comments (#) and blank lines",
      "Detects unpinned packages lacking exact '==' version specifier",
      "Returns clean list of problematic dependencies"
    ],
    predictPrompt: "Why do unpinned dependencies like openai cause production pipeline failures months later?",
    predictCode: `# requirements.txt (Unpinned vs Pinned):
# Unpinned (Dangerous):
# openai
# langchain

# Pinned (Production-ready):
openai==1.30.0
requests==2.31.0
pydantic==2.7.1`,
    predictOptions: [
      { id: "env-1", text: "Unpinned dependencies automatically install major breaking library updates when re-deployed, breaking existing API calls.", isCorrect: true, feedback: "Spot on! Package maintainers release breaking changes (v0.x to v1.x). Pinning versions with == guarantees reproducible builds." },
      { id: "env-2", text: "Unpinned dependencies make Python execute code 10x slower.", isCorrect: false, feedback: "Incorrect — version pinning affects dependency resolution, not runtime CPU performance." }
    ],
    breakItCode: `# Command run in global system terminal:
pip install langchain openai chromadb

# Months later: Project A needs langchain 0.1, Project B needs langchain 0.2
# Both installed into global Python site-packages!`,
    breakItPrompt: "What happens when 2 AI projects requiring different library versions are installed into global Python environment?",
    breakItOptions: [
      { id: "envb-1", text: "Dependency collision! Installing project B overwrites project A's packages, breaking project A.", isCorrect: true, feedback: "Exactly. Virtual environments (python -m venv .venv) isolate per-project packages." },
      { id: "envb-2", text: "Python automatically segregates them by project folder", isCorrect: false, feedback: "Incorrect — global pip install writes to one single shared site-packages directory!" }
    ],
    fixCode: `# Recommended standard workflow:
# 1. Create virtual environment:
python3 -m venv .venv

# 2. Activate:
source .venv/bin/activate  # Mac/Linux
# .venv\\Scripts\\activate  # Windows

# 3. Install pinned dependencies:
pip install -r requirements.txt

# 4. Freeze current state:
pip freeze > requirements.txt`
  },
  debuggingLab: {
    title: "12 — Debugging Lab: Type, Path & Encoding Error Triage",
    explanation: "Debug realistic production error traces from AI pipelines independently.",
    challenges: [
      {
        id: "dbg-1",
        title: "Triage 1: The FileNotFoundError Bug",
        code: `with open("prompts/system.txt") as f:
    prompt = f.read()`,
        bugDesc: "FileNotFoundError: [Errno 2] No such file or directory: 'prompts/system.txt'",
        prompt: "Why does relative string path 'prompts/system.txt' fail when script is executed from a different parent directory?",
        options: [
          { id: "d1-a", text: "Relative paths resolve against the CURRENT WORKING DIRECTORY, not script directory. Use Path(__file__).parent / 'prompts/system.txt'.", isCorrect: true, feedback: "Spot on! Path(__file__).parent anchors path relative to the script file location." },
          { id: "d1-b", text: "Python cannot read text files without installing a third-party package.", isCorrect: false, feedback: "Incorrect — standard library open() reads files cleanly when path exists." }
        ],
        fixedCode: `from pathlib import Path
SCRIPT_DIR = Path(__file__).parent
prompt_path = SCRIPT_DIR / "prompts" / "system.txt"
with open(prompt_path, "r", encoding="utf-8") as f:
    prompt = f.read()`
      },
      {
        id: "dbg-2",
        title: "Triage 2: UnicodeDecodeError",
        code: `with open("user_data.txt", "r") as f:
    content = f.read()`,
        bugDesc: "UnicodeDecodeError: 'charmap' codec can't decode byte 0x9d in position 42",
        prompt: "Why does reading a file containing UTF-8 characters crash on Windows default encoding?",
        options: [
          { id: "d2-a", text: "Windows default file encoding is OS-dependent (CP1252 / charmap). Pass encoding='utf-8' explicitly.", isCorrect: true, feedback: "Bingo! Always specify encoding='utf-8' when reading or writing text files in Python." },
          { id: "d2-b", text: "The file is corrupt and must be deleted.", isCorrect: false, feedback: "Incorrect — the file contains UTF-8 bytes that Windows default charmap codec cannot decode." }
        ],
        fixedCode: `with open("user_data.txt", "r", encoding="utf-8") as f:
    content = f.read()`
      }
    ]
  },
  finalProject: {
    title: "13 — Final Build: Reliable Data CLI Utility",
    mission: "Build a miniature production data pipeline CLI utility that reads a JSON list of items, validates their structure, filters active items above a minimum threshold, transforms the data, writes a report file using pathlib, and logs invalid records cleanly.",
    starterCode: `import json
from pathlib import Path

def process_ai_data_pipeline(input_json_path, output_report_path, min_score=80.0):
    """
    1. Read JSON file at input_json_path (handling missing file safely).
    2. Validate items (must contain 'id', 'status', 'score').
    3. Filter: keep items with status == 'active' and score >= min_score.
    4. Transform: add 'passed': True and format score to 2 decimal places.
    5. Write report to output_report_path using pathlib and encoding='utf-8'.
    6. Log count of valid vs rejected items.
    """
    # Write your implementation here
    pass`,
    requirements: [
      "Use pathlib for all file path operations.",
      "Safely handle missing file with try/except FileNotFoundError.",
      "Validate expected dictionary keys ('id', 'status', 'score') defensively.",
      "Convert string score numbers to float cleanly (float(item['score'])).",
      "Filter for status == 'active' and score >= min_score.",
      "Write pretty-printed JSON report with json.dumps(..., indent=2).",
      "Return summary dict: {'processed': N, 'passed': M, 'rejected': R}."
    ],
    hiddenEdgeCases: [
      "Item with missing 'status' key",
      "Item with score as string '85.5'",
      "Item with invalid score string 'N/A'",
      "Non-existent input JSON path",
      "Empty JSON list []"
    ],
    sampleJSON: `[
  {"id": "doc_1", "status": "active", "score": 92.5},
  {"id": "doc_2", "status": "inactive", "score": 88.0},
  {"id": "doc_3", "status": "active", "score": "75.0"},
  {"id": "doc_4", "status": "active", "score": "95.0"},
  {"id": "doc_5", "status": "active", "score": "INVALID_SCORE"}
]`,
    tests: [
      { id: "t1", inputName: "standard_payload.json", expectedStatus: "Passed 2, Rejected 3", description: "Processes mixed payload with string scores and invalid items." },
      { id: "t2", inputName: "missing_file.json", expectedStatus: "Handled FileNotFoundError", description: "Gracefully handles missing input file without unhandled crash." },
      { id: "t3", inputName: "empty_list.json", expectedStatus: "Passed 0, Rejected 0", description: "Handles empty list payload cleanly." }
    ],
    solutionCode: `import json
from pathlib import Path

def process_ai_data_pipeline(input_json_path, output_report_path, min_score=80.0):
    input_path = Path(input_json_path)
    output_path = Path(output_report_path)
    
    if not input_path.exists():
        return {"error": "Input file not found", "processed": 0, "passed": 0, "rejected": 0}
        
    try:
        with open(input_path, "r", encoding="utf-8") as f:
            items = json.load(f)
    except Exception as e:
        return {"error": f"JSON parse error: {e}", "processed": 0, "passed": 0, "rejected": 0}
        
    passed_items = []
    rejected_count = 0
    
    for item in items:
        if not isinstance(item, dict):
            rejected_count += 1
            continue
            
        status = item.get("status")
        raw_score = item.get("score")
        
        if status != "active" or raw_score is None:
            rejected_count += 1
            continue
            
        try:
            score = float(raw_score)
        except (ValueError, TypeError):
            rejected_count += 1
            continue
            
        if score >= min_score:
            record = dict(item)
            record["score"] = round(score, 2)
            record["passed"] = True
            passed_items.append(record)
        else:
            rejected_count += 1
            
    output_path.parent.mkdir(parents=True, exist_ok=True)
    report_data = {
        "summary": {
            "total_input": len(items),
            "passed_count": len(passed_items),
            "rejected_count": rejected_count
        },
        "results": passed_items
    }
    
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(report_data, f, indent=2)
        
    return {
        "processed": len(items),
        "passed": len(passed_items),
        "rejected": rejected_count
    }`,
    rubric: [
      {
        id: "rubric-1",
        title: "Defensive File Handling (pathlib & try/except)",
        criterion: "Uses pathlib.Path for all file operations, verifies file existence, and catches FileNotFoundError gracefully.",
        hint: "Path(input_json_path).exists() guard prevent unhandled OS crashes.",
        maxPoints: 15,
      },
      {
        id: "rubric-2",
        title: "Defensive JSON Ingestion",
        criterion: "Parses input JSON inside a try/except block, handling JSONDecodeError and invalid payload structures.",
        hint: "Wrap json.load() in try/except and ensure the parsed root is a list.",
        maxPoints: 15,
      },
      {
        id: "rubric-3",
        title: "Structural Record Validation",
        criterion: "Validates that every record is a dict and safely reads 'id', 'status', and 'score' using item.get().",
        hint: "Safely filter out corrupted non-dict items with isinstance(item, dict).",
        maxPoints: 15,
      },
      {
        id: "rubric-4",
        title: "Robust Type Coercion",
        criterion: "Defensively coerces string scores ('85.5') to float and rejects non-numeric junk ('INVALID_SCORE').",
        hint: "Catch (ValueError, TypeError) when calling float(raw_score).",
        maxPoints: 15,
      },
      {
        id: "rubric-5",
        title: "Filtering & Transformation",
        criterion: "Filters for status == 'active' and score >= min_score, rounds score to 2 decimals, and marks passed: True.",
        hint: "Never mutate shared dictionaries directly; construct clean records.",
        maxPoints: 15,
      },
      {
        id: "rubric-6",
        title: "Output File & Explicit UTF-8",
        criterion: "Creates destination directory if missing, writes using with open(..., encoding='utf-8'), and formats with indent=2.",
        hint: "Ensure output_path.parent.mkdir(parents=True, exist_ok=True) runs before open().",
        maxPoints: 15,
      },
      {
        id: "rubric-7",
        title: "Operational Metric Summary",
        criterion: "Returns exact summary dictionary with processed, passed, and rejected counts matching real data.",
        hint: "Verify total items == passed + rejected count.",
        maxPoints: 10,
      },
    ]
  }
};
