// ai-chat-service.js
// OpenAI Integration with RAG and Temperature Control

class AIChatService {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.model = "gpt-3.5-turbo";
    this.temperature = 0.4; // Consistent results, less random
    this.maxTokens = 2000;
    this.apiEndpoint = "https://api.openai.com/v1/chat/completions";
    this.conversationHistory = [];
  }

  /**
   * Send message to AI and get response
   * @param {string} userMessage - User's message
   * @param {string} analysisType - Type of analysis (contract, cost, vendor)
   * @returns {Promise<Object>} AI response
   */
  async chat(userMessage, analysisType = "general") {
    // Add user message to history
    this.conversationHistory.push({
      role: "user",
      content: userMessage
    });

    try {
      const systemPrompt = this.getSystemPrompt(analysisType);
      
      const response = await fetch(this.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: this.model,
          temperature: this.temperature, // 0.4 for consistent analysis
          max_tokens: this.maxTokens,
          messages: [
            {
              role: "system",
              content: systemPrompt
            },
            ...this.conversationHistory
          ]
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(`API Error: ${error.error.message}`);
      }

      const data = await response.json();
      const assistantMessage = data.choices[0].message.content;

      // Add assistant response to history
      this.conversationHistory.push({
        role: "assistant",
        content: assistantMessage
      });

      return {
        success: true,
        message: assistantMessage,
        temperature: this.temperature,
        model: this.model
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Analyze contract with RAG examples
   * @param {string} contractText - Contract to analyze
   * @returns {Promise<Object>} Analysis result
   */
  async analyzeContract(contractText) {
    const systemPrompt = `${RAG_KNOWLEDGE.systemInstructions}

USER IS ANALYZING A CONTRACT. Provide detailed JSON analysis following the examples above.`;

    const userMessage = `Please analyze this contract and provide a detailed JSON response:\n\n${contractText}`;

    try {
      const response = await fetch(this.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: this.model,
          temperature: this.temperature,
          max_tokens: this.maxTokens,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userMessage }
          ]
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error.message);
      }

      const data = await response.json();
      const content = data.choices[0].message.content;
      
      // Try to parse JSON from response
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return {
          success: true,
          analysis: JSON.parse(jsonMatch[0])
        };
      }
      
      return {
        success: true,
        analysis: { raw_response: content }
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Get system prompt based on analysis type
   * @private
   * @param {string} analysisType - Type of analysis
   * @returns {string} System prompt
   */
  getSystemPrompt(analysisType) {
    const basePrompt = RAG_KNOWLEDGE.systemInstructions;

    const typePrompts = {
      contract: `${basePrompt}\n\nYou are now in CONTRACT ANALYSIS mode. Focus on legal risks, compliance issues, and commercial terms.`,
      cost: `${basePrompt}\n\nYou are now in COST ANALYSIS mode. Focus on price anomalies, leakage opportunities, and vendor pricing.`,
      vendor: `${basePrompt}\n\nYou are now in VENDOR RISK ASSESSMENT mode. Focus on financial health, payment history, and operational risks.`,
      general: basePrompt
    };

    return typePrompts[analysisType] || basePrompt;
  }

  /**
   * Clear conversation history
   */
  clearHistory() {
    this.conversationHistory = [];
  }

  /**
   * Get conversation history
   * @returns {Array} Conversation history
   */
  getHistory() {
    return this.conversationHistory;
  }

  /**
   * Get current settings
   * @returns {Object} Current configuration
   */
  getSettings() {
    return {
      model: this.model,
      temperature: this.temperature,
      maxTokens: this.maxTokens,
      conversationLength: this.conversationHistory.length
    };
  }
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AIChatService;
}