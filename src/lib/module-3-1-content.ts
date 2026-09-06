export interface Module31StageContent {
  hook: {
    title: string;
    incidentScenario: {
      missionTitle: string;
      code: string;
      expectedBehavior: string;
      actualBehavior: string;
      prompt: string;
      predictionOptions: {
        id: string;
        text: string;
        feedback: string;
      }[];
    };
  };
  why: {
    title: string;
    practicalProblem: string;
    coreTakeaways: string[];
  };
  teach: {
    pillars: {
      id: string;
      title: string;
      explanation: string;
      example: string;
      keyInsight: string;
    }[];
  };
  tryIt: {
    title: string;
    code: string;
    prompt: string;
    predictionOptions: {
      id: string;
      text: string;
      feedback: string;
    }[];
    revelation: {
      predictionSummary: string;
      actualResult: string;
      why: string;
      modificationTask: string;
    };
  };
  practice: {
    activities: {
      id: string;
      title: string;
      type: "read" | "identify" | "modify";
      code: string;
      prompt: string;
      options: {
        id: string;
        text: string;
        isCorrect: boolean;
        feedback: string;
      }[];
    }[];
  };
  breakIt: {
    title: string;
    brokenCode: string;
    subtleBugDescription: string;
    question1: {
      prompt: string;
      options: { id: string; text: string; isCorrect: boolean; feedback: string }[];
    };
    question2: {
      prompt: string;
      options: { id: string; text: string; isCorrect: boolean; feedback: string }[];
    };
    progressiveHints: string[];
  };
  fixIt: {
    title: string;
    fixedCode: string;
    postFixExplanation: {
      whatBroke: string;
      whyItBroke: string;
      howYouFoundIt: string;
      whyFixWorks: string;
    };
  };
  yourTurn: {
    title: string;
    taskPrompt: string;
    aiGeneratedCode: string;
    expectedGoal: string;
    bugSummary: string;
    options: {
      id: string;
      text: string;
      isCorrect: boolean;
      feedback: string;
    }[];
    fixedCode: string;
  };
  knowledgeCheck: {
    questions: {
      id: string;
      type: "mcq" | "output_prediction" | "identify_problem" | "debugging_step" | "reasoning";
      question: string;
      code?: string;
      options: { id: string; text: string; isCorrect: boolean; explanation: string }[];
    }[];
  };
  mastery: {
    criteria: {
      id: string;
      label: string;
      field: string;
    }[];
    finalEvidencePrompt: string;
  };
}

export const module31Content: Module31StageContent = {
  hook: {
    title: "Mission: The Silent Calculation Failure",
    incidentScenario: {
      missionTitle: "INCIDENT REPORT #301 — E-Commerce Discount Calculator",
      code: `def calculate_final_price(cart_items, discount_code):
    subtotal = 0
    for item in cart_items:
        subtotal += item["price"] * item["quantity"]

    # AI generated this discount logic:
    if discount_code == "SAVE20":
        discount = subtotal * 0.20
    elif discount_code == "SAVE10":
        discount = subtotal * 0.10
    else:
        discount = 0

    # Apply 5% tax
    total = subtotal - discount * 1.05
    return round(total, 2)

# Test run:
cart = [{"price": 100, "quantity": 1}]
print(calculate_final_price(cart, "SAVE20"))`,
      expectedBehavior: "Expected total for $100 cart with 20% discount ($80) + 5% tax on discounted amount ($4) is $84.00.",
      actualBehavior: "Calculated output is $79.00 — $5 cheaper than it should be!",
      prompt: "AI generated this code. It runs without any errors. But something is wrong with the output. What do you predict is happening?",
      predictionOptions: [
        {
          id: "opt1",
          text: "The tax is subtracted instead of added, because multiplication precedence applies `(discount * 1.05)` before subtraction `(subtotal - ...)`",
          feedback: "Spot on! `subtotal - discount * 1.05` evaluates as `100 - (20 * 1.05)` = `100 - 21` = `$79.00`. Operator precedence creates a silent logic bug."
        },
        {
          id: "opt2",
          text: "The loop over cart_items is skipping items with quantity 1.",
          feedback: "Not quite — `item['price'] * item['quantity']` for 100 * 1 evaluates to 100 cleanly."
        },
        {
          id: "opt3",
          text: "The discount code check is failing and falling back to 0.",
          feedback: "Look closer — the 'SAVE20' condition matched and set `discount = 20`. The bug happens during final formula assembly."
        }
      ]
    }
  },
  why: {
    title: "Why Code When You Can Vibe Code?",
    practicalProblem: "AI coding assistants can generate dozens of lines of code in seconds. However, when AI-generated code behaves unexpectedly, produces subtle financial or logic errors, fails under edge cases, or needs customization, YOU are responsible for inspecting and repairing it.",
    coreTakeaways: [
      "AI generates proposals, not guaranteed truths. Running code without errors does NOT mean correct code.",
      "Logic bugs rarely throw syntax errors — operator precedence, boundary conditions, and type mismatches fail silently.",
      "Understanding Python code makes you 10x faster at prompting, reviewing, and debugging AI outputs."
    ]
  },
  teach: {
    pillars: [
      {
        id: "pillar-a",
        title: "A. Why Code if Vibe Coding Works?",
        explanation: "Vibe coding gets you from 0 to 80% rapidly. But the remaining 20% contains production edge cases, security validation, and logic correctness that AI often hallucinates or simplifies.",
        example: "# Prompt: 'Parse user age from web form'\nage = request.form['age']\nif age > 18: # ❌ TypeError! AI forgot age is a string '18', not integer 18.",
        keyInsight: "AI tools write syntactically clean code, but they do not understand your business invariants."
      },
      {
        id: "pillar-b",
        title: "B. What Breaks When Vibe Coding Fails?",
        explanation: "When AI fails, it fails silently. It doesn't scream with a red stack trace; instead, it returns $79 instead of $84 or leaks memory silently.",
        example: "# Silent failure in AI code:\ndef is_admin(user):\n    return user.get('role') == 'admin' or user.get('is_superuser') # returns None instead of False if key missing",
        keyInsight: "Without code reading skills, silent bugs reach your end users before you notice them."
      },
      {
        id: "pillar-c",
        title: "C. How Understanding Code Supercharges Vibe Coding",
        explanation: "When you understand code, you stop guessing prompts. You inspect the generated block, spot the invalid operator or missing parameter, and guide the AI with surgical precision.",
        example: "Vibe coder prompt: 'Fix the bug where money is wrong'\nCode reader prompt: 'Line 14: subtotal - discount * 1.05 evaluates operator precedence incorrectly. Wrap (subtotal - discount) * 1.05.'",
        keyInsight: "Precision prompts require code reading."
      },
      {
        id: "pillar-d",
        title: "D. What Python Adds Beyond Plain English",
        explanation: "Plain English is ambiguous ('Apply 5% tax to the remaining amount'). Python is unambiguous mathematical specification (`(subtotal - discount) * 1.05`).",
        example: "# English: 'Filter high priority active tickets'\n# Python:\ntickets = [t for t in data if t['priority'] == 'high' and t['status'] == 'active']",
        keyInsight: "Python is the unambiguous specification language for AI instruction."
      }
    ]
  },
  tryIt: {
    title: "Inspect & Predict: The AI User Filter",
    code: `def get_active_users(users):
    active = []
    for u in users:
        if u.get("is_active") and u.get("login_count", 0) > 0:
            active.append(u["name"])
    return active

sample_users = [
    {"name": "Alice", "is_active": True, "login_count": 5},
    {"name": "Bob", "is_active": False, "login_count": 12},
    {"name": "Charlie", "is_active": True, "login_count": 0}
]

print(get_active_users(sample_users))`,
    prompt: "Before running this AI-generated function, inspect it. Who will be included in the returned list?",
    predictionOptions: [
      {
        id: "try-1",
        text: "['Alice'] only",
        feedback: "Correct! Alice has `is_active == True` and `login_count == 5 (> 0)`. Bob is inactive, Charlie has `login_count == 0`."
      },
      {
        id: "try-2",
        text: "['Alice', 'Bob']",
        feedback: "Incorrect — Bob has `is_active: False`, so `u.get('is_active')` evaluates to False."
      },
      {
        id: "try-3",
        text: "['Alice', 'Charlie']",
        feedback: "Incorrect — Charlie has `login_count: 0`, so `0 > 0` evaluates to False."
      }
    ],
    revelation: {
      predictionSummary: "Your prediction tested your ability to trace boolean `AND` conditions.",
      actualResult: "['Alice']",
      why: "Both conditions `is_active == True` AND `login_count > 0` must be true simultaneously.",
      modificationTask: "What if business requirements change so new active users with 0 logins ARE allowed?"
    }
  },
  practice: {
    activities: [
      {
        id: "practice-1",
        title: "Activity 1: Trace Generated Code",
        type: "read",
        code: `def format_currency(amount):
    return f"\${amount:.2f}"

print(format_currency(19.5))`,
        prompt: "What will `format_currency(19.5)` print?",
        options: [
          { id: "p1-a", text: "$19.50", isCorrect: true, feedback: "Correct! `:.2f` formats floats to exactly 2 decimal places with leading currency symbol." },
          { id: "p1-b", text: "$19.5", isCorrect: false, feedback: "Incorrect — `:.2f` enforces 2 decimal places." },
          { id: "p1-c", text: "19.50$", isCorrect: false, feedback: "Incorrect — the $ prefix is placed first in the f-string." }
        ]
      },
      {
        id: "practice-2",
        title: "Activity 2: Identify Suspicious Logic",
        type: "identify",
        code: `def calculate_average(scores):
    # AI generated average calculation:
    return sum(scores) / len(scores)`,
        prompt: "Under what input condition will this AI-generated function crash with a ZeroDivisionError?",
        options: [
          { id: "p2-a", text: "When `scores = []` (an empty list)", isCorrect: true, feedback: "Spot on! `len([])` is 0, causing division by zero. AI often forgets empty collection checks!" },
          { id: "p2-b", text: "When `scores = [0, 0, 0]`", isCorrect: false, feedback: "Incorrect — `sum` is 0, `len` is 3, `0 / 3` cleanly returns `0.0`." },
          { id: "p2-c", text: "When `scores` contains negative numbers", isCorrect: false, feedback: "Incorrect — negative floats divide without issue." }
        ]
      },
      {
        id: "practice-3",
        title: "Activity 3: Modify Code for New Requirements",
        type: "modify",
        code: `def sanitize_username(name):
    return name.strip().lower()`,
        prompt: "How should you modify this AI snippet to also replace spaces with underscores `_`?",
        options: [
          { id: "p3-a", text: "return name.strip().lower().replace(' ', '_')", isCorrect: true, feedback: "Perfect! Method chaining in Python runs sequentially left-to-right." },
          { id: "p3-b", text: "return name.strip().lower() + '_'", isCorrect: false, feedback: "Incorrect — that appends a trailing underscore instead of replacing internal spaces." },
          { id: "p3-c", text: "return name.replace('_', ' ').strip()", isCorrect: false, feedback: "Incorrect — that converts underscores into spaces!" }
        ]
      }
    ]
  },
  breakIt: {
    title: "Break It: The AI Rate-Limiter Bug",
    brokenCode: `def allow_request(user_requests, max_allowed=5):
    # AI comment: Returns True if user has sent fewer than max_allowed requests
    current_count = len(user_requests)
    
    # INTENTIONAL BUG HERE:
    if current_count >= max_allowed:
        return True
    return False

# Test run with 6 requests (exceeding limit of 5):
user_history = ["req1", "req2", "req3", "req4", "req5", "req6"]
print("Allowed?", allow_request(user_history, 5))`,
    subtleBugDescription: "AI inverted the conditional operator logic in the rate limiter!",
    question1: {
      prompt: "The AI assistant claims: 'This rate-limiter returns True when the user is safe to proceed.' Do you agree?",
      options: [
        { id: "b1-no", text: "NO — the code returns True when requests EXCEED or equal the limit, letting abusers in!", isCorrect: true, feedback: "Bingo! `if current_count >= max_allowed: return True` inverts security logic." },
        { id: "b1-yes", text: "YES — `len(user_requests)` correctly counts 6 items.", isCorrect: false, feedback: "Notice the return value: 6 >= 5 evaluates to True, which allows the request when it should block!" }
      ]
    },
    question2: {
      prompt: "What line/operator would you inspect first to repair this security logic?",
      options: [
        { id: "b2-a", text: "Change `current_count >= max_allowed` to `current_count < max_allowed`", isCorrect: true, feedback: "Exactly. A user is allowed if their count is strictly LESS than max_allowed." },
        { id: "b2-b", text: "Change `len(user_requests)` to `user_requests.count()`", isCorrect: false, feedback: "Incorrect — `count()` requires an argument and doesn't measure list length." }
      ]
    },
    progressiveHints: [
      "Hint 1: Trace `current_count = len(['req1'...'req6'])` which is 6.",
      "Hint 2: Evaluate `6 >= 5`. That is True.",
      "Hint 3: Returning True for 6 requests allows spam users through!"
    ]
  },
  fixIt: {
    title: "Fix It: Restoring the Security Invariant",
    fixedCode: `def allow_request(user_requests, max_allowed=5):
    current_count = len(user_requests)
    # Correct invariant: Allow if strictly below limit
    if current_count < max_allowed:
        return True
    return False`,
    postFixExplanation: {
      whatBroke: "The conditional operator `>=` was used instead of `<`.",
      whyItBroke: "AI assistants frequently confuse inverted security booleans like `is_blocked` vs `is_allowed`.",
      howYouFoundIt: "By testing with an input payload that breached the limit (6 items) and observing the inverted boolean return.",
      whyFixWorks: "`current_count < max_allowed` guarantees that a 6th request evaluates to False."
    }
  },
  yourTurn: {
    title: "Your Turn: Independent AI Code Review",
    taskPrompt: "AI generated this discount application code for an e-commerce checkout. Your job: review it, identify the bug, and select the correct fix before shipping.",
    aiGeneratedCode: `def apply_coupon(price, code):
    valid_coupons = {"SAVE10": 10, "HALF": 50}
    
    # AI code logic:
    if code in valid_coupons:
        discount_percent = valid_coupons[code]
        price = price - discount_percent # ❌ BUG HERE!
    return price

print(apply_coupon(100, "SAVE10")) # Prints 90 (Looks right!)
print(apply_coupon(200, "HALF"))   # Prints 150 (WRONG! Should be 100!)`,
    expectedGoal: "50% off $200 should be $100, but code subtracts $50 flat!",
    bugSummary: "AI subtracted `discount_percent` directly as a dollar amount instead of calculating `price * (discount_percent / 100)`.",
    options: [
      {
        id: "yt-1",
        text: "Fix line 7 to: `price = price * (1 - discount_percent / 100)`",
        isCorrect: true,
        feedback: "Masterful! For 'HALF' (50%), `200 * (1 - 50/100)` = `200 * 0.5` = `$100`. The fix properly applies percentage discounts."
      },
      {
        id: "yt-2",
        text: "Fix line 3 to: `valid_coupons = {'SAVE10': 0.1, 'HALF': 0.5}`",
        isCorrect: false,
        feedback: "Partial fix, but line 7 `price - 0.5` would still subtract 50 cents instead of 50 percent!"
      },
      {
        id: "yt-3",
        text: "Change `price - discount_percent` to `price / discount_percent`",
        isCorrect: false,
        feedback: "Incorrect — dividing $100 by 10 yields $10 instead of $90."
      }
    ],
    fixedCode: `def apply_coupon(price, code):
    valid_coupons = {"SAVE10": 10, "HALF": 50}
    if code in valid_coupons:
        discount_percent = valid_coupons[code]
        price = price * (1 - discount_percent / 100)
    return round(price, 2)`
  },
  knowledgeCheck: {
    questions: [
      {
        id: "kc-1",
        type: "debugging_step",
        question: "Your AI-generated Python code runs without any syntax errors, but produces an incorrect output on checkout total. What should you do FIRST?",
        options: [
          { id: "kc1-a", text: "Inspect intermediate variable values and test with a simple controlled input", isCorrect: true, explanation: "Always isolate variable state with simple known test inputs before reprompting blindly." },
          { id: "kc1-b", text: "Delete the code and ask AI to 'make it better'", isCorrect: false, explanation: "Vague reprompting without identifying the root cause usually leads to new hallucinated bugs." },
          { id: "kc1-c", text: "Assume the output is correct because Python threw no errors", isCorrect: false, explanation: "Logic bugs do not throw runtime exceptions. Absence of error != correctness." }
        ]
      },
      {
        id: "kc-2",
        type: "output_prediction",
        question: "What will this snippet return when `items = []`?",
        code: `def get_first_item(items):
    return items[0] if items else "EMPTY"`,
        options: [
          { id: "kc2-a", text: "\"EMPTY\"", isCorrect: true, explanation: "Correct! `if items` evaluates to False for empty lists, cleanly avoiding `IndexError`." },
          { id: "kc2-b", text: "IndexError exception", isCorrect: false, explanation: "Incorrect — the inline ternary checks `if items` first!" },
          { id: "kc2-c", text: "None", isCorrect: false, explanation: "Incorrect — the else branch explicitly returns the string 'EMPTY'." }
        ]
      },
      {
        id: "kc-3",
        type: "identify_problem",
        question: "Why does plain-English prompting alone fall short when building complex AI applications?",
        options: [
          { id: "kc3-a", text: "English prose contains natural ambiguity, whereas code defines precise deterministic execution", isCorrect: true, explanation: "Natural language is inherently open to interpretation; Python code forms unambiguous execution contracts." },
          { id: "kc3-b", text: "AI cannot read English prompts", isCorrect: false, explanation: "AI reads English well, but English lacks the precision needed to express exact computational edge cases." },
          { id: "kc3-c", text: "Python runs faster than English", isCorrect: false, explanation: "Execution speed isn't the primary reason — formal precision is." }
        ]
      },
      {
        id: "kc-4",
        type: "reasoning",
        question: "Which action demonstrates true AI code mastery over passive 'vibe coding'?",
        options: [
          { id: "kc4-a", text: "Reading generated code, identifying a subtle logic defect, and verifying the fix with test inputs", isCorrect: true, explanation: "Verification, code tracing, and debugging proof represent true engineering mastery." },
          { id: "kc4-b", text: "Copying generated code directly into production without reading it", isCorrect: false, explanation: "That is blind vibe coding, which leads to production outages." },
          { id: "kc4-c", text: "Accepting the first output generated by an LLM", isCorrect: false, explanation: "First outputs often contain unhandled edge cases." }
        ]
      }
    ]
  },
  mastery: {
    criteria: [
      { id: "crit-1", label: "Completed Hook Prediction & Incident Inspection", field: "hook" },
      { id: "crit-2", label: "Understood Practical 'Why Code' Principles", field: "why" },
      { id: "crit-3", label: "Completed Interactive Try It & Guided Practice Activities", field: "practice" },
      { id: "crit-4", label: "Successfully Debugged & Fixed the Broken Rate Limiter", field: "breakIt" },
      { id: "crit-5", label: "Passed Independent Code Review (Your Turn)", field: "yourTurn" },
      { id: "crit-6", label: "Passed Diagnostic Knowledge Check Assessment", field: "knowledgeCheck" }
    ],
    finalEvidencePrompt: "In your own words: Explain what went wrong in the e-commerce coupon code and why understanding Python made you faster at fixing it than reprompting."
  }
};
